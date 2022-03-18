###
 # @Author: your name
 # @Date: 2021-10-28 19:27:06
 # @LastEditTime: 2021-10-29 09:10:28
 # @LastEditors: Please set LastEditors
 # @Description: In User Settings Edit
 # @FilePath: \V9_Dev\deploy.bash
### 
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build:prod

rm -r '\\192.168.1.22\JvMmsV9Front\dist'

cp -r dist '\\192.168.1.22\JvMmsV9Front'

cd -