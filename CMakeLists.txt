cmake_minimum_required(VERSION 3.10)
project(StenoAnkiEngine)

set(CMAKE_CXX_STANDARD 11)

# Include RapidJSON headers
include_directories(classes/rapidjson/)

# Add executable
add_executable(StenoAnkiEngine main.cpp classes/AVLTree.cpp classes/DictionaryParser.cpp)

# Link any additional libraries if necessary
# target_link_libraries(StenoAnkiEngine your_library_name)

