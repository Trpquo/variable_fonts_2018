from __future__ import print_function, division, absolute_import
from fontTools import ttLib
from fonttools_akcije import dewoffing
import sys
import os


def main(args=None):
    if args[3]:
        print("Starting dewoff....")
        dewoffing(args[4], args[5], args[0], args[1])
    xmls = []
    for font in args[0]:
        fontFile = os.path.join(args[1], font)
        print("XMLing...", font)
        xml = ttLib.TTFont(fontFile)
        xmls.append(xml)
        if args[2]: 
            xml.saveXML(fontFile.replace("\\otf\\", "\\xml\\").replace(".otf", ".xml").replace(".ttf", ".xml"))
    return xmls


if __name__ == '__main__':
    sys.exit(main())