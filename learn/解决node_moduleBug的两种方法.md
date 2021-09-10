##解决node_module的bug 
[参考链接](https://www.cnblogs.com/baixiaoxiao/p/12964170.html)

一. 利用webpack配置路径别名  
   webpack alias会替换我们写的“简写路径”，并且它对node_modules里面的文件也是生效的。这时候我们可以将别人源码里面引用模块的路径替换成我们自己的文件。  
   1. 找到别人源码里面的需要修改的模块，复制代码到src目录  
   2. 修改其中的bug，注意里面引用其他的文件都需要写成绝对路径  
   3. 找到这个模块被引入的路径（我们需要拦截的路径）  
   4. 配置webpack alias  
   实际试了下成功率不高，首先要替换拦截路径，有些项目依赖太多，不好找出全部有引用你改的文件的路径，其次，有些入index.js这样的文件，很多都是一样的，替换的
   话影响太多文件。**不推荐使用**
   
二. 使用 patch-package 来修改 **强烈推荐**
   步骤很简单
   1. 安装patch-package：
   ```
   npm i patch-package --save-dev
   ```
   2. 修改package.json，新增命令postinstall:
   ```
   "scripts": {
         "postinstall": "patch-package"
    }
   ```
   3. 修改node_modules里面的代码
   
   4. 执行命令：
   ```
      npx patch-package 修改包的名称。
   ```
   执行完会在根目录下新建patches文件夹,里面保存对应包修改的记录，将这个文件夹提交git,其他人使用是只要执行**npm install**,会
   自动调用**postinstall** 这个钩子，将代码修改

   
    
