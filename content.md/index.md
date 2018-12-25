# index

:status-icon="true"  加冒号  里面就是表达式 

## $refs

1.任何实例身上都有一个refs属性 作用:帮助我们

ref:
可以给任意的dom对象或者是组件添加  表示给这个元素指定了一个引用
可以通过实例的$refs.xxx就可以获取到这个DOM对象或者是组件
可以调用组件内部的方法。

## session和cookie的缺点(会话保持)

1. 服务器会浪费内存
2. 不利于集群   不利于扩大规模
3. sessionID  cookie里卖弄  cookie不能跨域  在移动端  很多浏览器不支持cookie 禁用cookie

## token技术(用localStroage)

令牌  票据  服务器不存token
颁发token  通过一定的算法  把你的用户名  登录的时候  过期的时间   
下次再次访问的时候   检验token  token是否有效   token 是否过期