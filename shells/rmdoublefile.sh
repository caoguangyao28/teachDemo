#!/bin/bash

# 定义目录路径
directory="/Volumes/cgy-yd/equbs"

# 存储.epub 文件名的数组
epub_files=()

# 遍历目录，查找.epub 文件并将文件名存储到数组中
for file in "$directory/"*.epub; do
    if [ -f "$file" ]; then
        epub_files+=("$(basename "$file")")  # 移除引号内的美元符号并使用basename获取文件名
    fi
done

# 遍历目录，查找.mobi 文件
for file in "$directory/"*.mobi; do
    filename=$(basename "$file")  # 移除引号内的美元符号并正确赋值
    # 如果.mobi 文件的名称存在于.epub 文件名数组中，则删除该.mobi 文件
    for epub_file in "${epub_files[@]}"; do
        if [ "$epub_file" == "${filename%.mobi}.epub" ]; then
            rm "$file"  # 删除匹配的.mobi 文件
            break
        fi
    done
done
