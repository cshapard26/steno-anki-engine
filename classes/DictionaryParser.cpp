#include "DictionaryParser.h"
#include "rapidjson/document.h"
#include "rapidjson/filereadstream.h"
#include <cstdio>
#include <iostream>

using namespace rapidjson;

void DictionaryParser::parseAndAddToTree(const std::string& filename, AVLTree& tree) {
    FILE* file = fopen(filename.c_str(), "rb");
    if (!file) {
        std::cerr << "Error: Unable to open JSON file: " << filename << std::endl;
        return;
    }

    char buffer[65536];
    FileReadStream inputStream(file, buffer, sizeof(buffer));

    Document document;
    document.ParseStream(inputStream);

    fclose(file);

    if (document.HasParseError()) {
        std::cerr << "Error: JSON parse error: " << document.GetParseError() << std::endl;
        return;
    }

    if (!document.IsObject()) {
        std::cerr << "Error: JSON root is not an object." << std::endl;
        return;
    }

    for (Value::ConstMemberIterator itr = document.MemberBegin(); itr != document.MemberEnd(); ++itr) {
        const std::string value = itr->name.GetString();
        const std::string key = itr->value.GetString();
        tree.insert(key, value);
    }
}
