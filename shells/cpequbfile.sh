#!/bin/bash

# 源目录
source_dir="/Volumes/cgy-yd/下载的图书"

# 目标目录
target_dir="/Volumes/cgy-yd/azw3s"

# 遍历源目录及其子目录，拷贝.equb 文件
find $source_dir -name "*.azw3" -exec cp '{}' $target_dir \;
