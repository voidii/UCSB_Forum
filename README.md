## UCSB论坛开发日志

用React和Firebase开发

6/18/2020

今天拿原来CS185的一些代码写了首页和Tab，加了一个Sign in功能有待完善

前端的设计我估计我是做不来了，先把功能实现了再说吧

其实不知道自己会做到什么地步，一步一步来吧，看看今晚能不能把登录功能搞定先

6/19/2020

登陆功能基本完成，UI稍改一下就可以完成注册功能

明天可以开始着手实现贴吧的类似功能了

先这样吧

6/23/2020

新的学期又开始了，以后尽量一周更新点功能吧

帖子功能靠着CS185的遗产弄出来了，现在有待优化的part有：

1，帖子内容不能换行

2，不知道怎么得到当前用户的uid，鼓捣一下午都没搞定，这个搞定了才有后面的删帖之类的操作

3，数据库还没组织好

4，需要加入上传图片的功能

5，CSS实在是不知道怎么改，界面跟便便一样

今天先这样吧

7/5/2020

好吧，好久不更新了，好不容易更新一下还是个憨憨功能

遗留问题解决:已经可以成功获取用户的UID，发帖子时uid会和用户的uid对齐，删除时会根据发布时间来删除，以后可能可以加一个uid要和操作用户一样才能删除的判定

先这样今天

7/6/2020

上午出现了一个关于firebase的bug，但是无法复现了，不知道为啥，等日后调试看看吧

帖子点击之后出现模态框，并可以将帖子的独立id传给reply的component

遗留问题一个都没有解决

新增问题：页面刷新之后，firebase的auth已经消失了但是还是显示logged in状态，有待解决，没有uid的情况下是不能发送帖子的

先这样

///////////////////////////
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
