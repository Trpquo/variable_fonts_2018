from __future__ import print_function, division, absolute_import
from woff_decompress import main as dewoff
from woff_compress import main as woffup

from fontTools.ttLib.tables import otTables
from fontTools import ttLib
TTFont = ttLib.TTFont
from fontTools.ttLib.tables.DefaultTable import DefaultTable
import json

import sys
import os
import io

# chek for woff
root = os.path.dirname(__file__)
fontRepos = os.path.join(root, 'otf')
fontFiles = [f for f in os.listdir(fontRepos) if os.path.isfile(os.path.join(fontRepos, f))]
woffRepos = os.path.join(root, 'woff')
woffFiles = [f for f in os.listdir(woffRepos) if os.path.isfile(os.path.join(woffRepos, f))]

def dewoffing(woofFiles, woofRepos, fontFiles, fontRepos):
    print(len(woffFiles), "woffova")
    for woff in woffFiles:
        for otf in fontFiles:
            if woff.split(".", 1)[0] == otf.split(".", 1)[0]:
                print("Preskacem...", woff)
                woffFiles.remove(woff)
    print(len(woffFiles), "woffova")

    for font in woffFiles:
        print("Dewoffing...", font)
        dewoff([font, woffRepos])

def woffing(fontFiles, fontRepos, woffFiles, woffRepos):
    print(len(fontFiles), "fontova")
    for woff in woffFiles:
        for otf in fontFiles:
            if woff.split(".", 1)[0] == otf.split(".", 1)[0]:
                print("Preskacem...", otf)
                fontFiles.remove(otf)
    print(len(fontFiles), "fontova")

    for font in fontFiles:
        print("Woffing...", font)
        woffup([font, fontRepos])

def XMLing(args=None):
    if args[3]:
        print("Starting dewoff....")
        dewoffing(args[4], args[5], args[0], args[1])
    xmls = []
    for font in args[0]:
        fontFile = os.path.join(args[1], font)
        # print("XMLing...", font)
        xml = ttLib.TTFont(fontFile)
        xmls.append(xml)
        if args[2]: 
            xml.saveXML(fontFile.replace("\\otf\\", "\\xml\\").replace(".otf", ".xml").replace(".ttf", ".xml"))
    return xmls

def toStr(s):
     try:
        s = s.encode('utf-8')
     except AttributeError:
        pass
     return s

def clear(s): 
    separators = [".","-","_"]
    for p in separators:
        s = s.split(p)[0]
    return s

def jsoning(fontFiles=fontFiles, fontRepos=fontRepos, saveXML=False, unwoffing=False, woffFiles=woffFiles, woffRepos=woffRepos):
    
    xmls = XMLing([fontFiles, fontRepos, saveXML, unwoffing, woffFiles, woffRepos])
    fjson = {}
    for font in xmls:
        if not 'cmap' in font:
            raise Exception('missing cmap table')
        

        fname = clear(font['name'].getName(6, 3, 1).toUnicode())
        print("fontName:", fname)

        fontData = {}

        fileName = fontFiles[xmls.index(font)].replace(".ttf", ".woff2").replace(".otf", ".woff2")
        print("fileName:", fileName)
        fontData["fileName"] = fileName
        
        fformat = "woff2"
        # print("format:", fformat)
        fontData["format"] = fformat

        axes = []
        for ax in font["fvar"].axes:
            axID = ax.axisNameID
            axname = None
            axcode = str(toStr(ax.axisTag), "utf-8", errors='ignore')
            for name in font["name"].names:
                if name.nameID == axID:
                    axname = name.string.decode("utf-16be", "replace") 
            if axname == None:
                axname = axcode
            a = {
                "axname": axname,
                "axcode": axcode,
                "min": ax.minValue,
                "max": ax.maxValue,
                "default": ax.defaultValue
            }
            axes.append(a)
        print("Axes:", axes)
        fontData["axis"] = axes

        fontData["desc"] = ""
        print("\n")

        # compile font
        fjson[fname] = fontData
    
    return fjson

jsonFile = root.replace("\\fontovi", "\\font-info.json")
with io.open(jsonFile, 'w', encoding='utf-8') as f:
  f.write(json.dumps(jsoning(), ensure_ascii=False))
