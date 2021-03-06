##输入URL发生了什么

### 一:网络通信

1. 网络分层  
   通过分层,每一层实现不同的功能，然后将数据传递下一层，使每一层分工明确，更好实现
   
2. TPC/IP五层模型  
   1. 物理层  
      通过物理手段将各种硬件(如光纤,网线)连接在一起，用来传输电信号  
   2. 数据链路层  
      制定协议，给0/1信号分组，规定不同组的意义  
      1.  以太网协议  
          以太网协议规定一组电信号构成一个数据包，我们把这个数据包称为 *帧* ，每一个帧由 *标头* 和 *数据* 两部分组成    
      2.  MAC地址  
          每台计算机的网卡的唯一地址，可以通过MAC地址标识对方  
      3.  广播  
          通过广播，向局域网的所有计算机发送数据，对方根据数据中的MAC地址决定是否接收    
   3. 网络层  
      因为数据是通过广播发送，不可能所有计算机全部接收，所以有了子网(局域网)，广播只在子网发送，如果找不到MAC地址，就交由网关转发  
      1. IP协议  
         通过ip地址能确定计算机处于哪个局域网下，IP分为网络部分和主机部分，位数不是固定的，假如两个计算机的IP地址的网络部分是一致的，那这两个计算机就处于同个局域网下
      2. 子网掩码  
         ip地址不能确定自己网络部分的位数是多少，而子网掩码规定的就是网络和主机的位数，通过IP地址和子网掩码，我们就能确定计算机是否在同一子网下
      3. ARP协议  
         我们知道,计算机广播发送数据时需要协带MAC地址，这个地址从哪来呢？ARP协议是通过广播给子网的计算机发送数据，数据携带接受者的IP地址，对方收到后与自身的IP地址进行
         对比，如果相同就接收数据，并把自己的MAC地址发送回去，不相同就丢弃这个数据包。如果不是通过子网的话，会发送给网关，有网关进行转发  
   4. 运输层  
      通过上面三层的作用，我们成功的将计算机A的数据传给计算机B，可以计算机有各种各样的应用程序，无法确定要传给哪个程序，这就需要端口了，传输层就是建立端口对端口的通信  
      1. UDP协议  
         是用户数据报协议，是一种无连接的协议。UDP有不提供数据包分组、组装和不能对数据包进行排序的缺点，也就是说，当报文发送之后，是无法得知其是否安全完整到达的。  
         UDP特点:① 面向无连接 ②有单播，多播，广播 ③面向报文，不对报文进行处理 ④不可靠性，受网络环境影响 ⑤头部开销小，传输数据报文高效(在某些实时要求高的场景(电话会议)就用到)  
      2. TCP协议  
         是传输控制协议是一种面向连接的、可靠的、基于字节流的传输层通信协议。  
         TCP特点:①面向连接 ② 仅支持单播传输 ③面向字节流 ④可靠传输 ⑤提供拥塞控制 ⑥TCP提供全双工通信
         1.  TCP三次握手   其实就是指建立一个TCP连接时，需要客户端和服务器总共发送3个包。
                           进行三次握手的主要作用就是为了确认双方的接收能力和发送能力是否正常、指定自己的初始化序列号为后面的可靠性传送做准备  
                           刚开始，客户端处于close状态,服务端处于listen状态
              SYN:是一段数据报文
              ISN:初始化序列号,序列号用于判断连接是否正确
              seq:序列号
              ack:确认号，表示期望收到的下一个字节的序号。ack=发起方seq+1
              ACK:确认状态，为1是表示数据正常收到
              ![三次握手](https://img-blog.csdn.net/20180808105159546?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2p1bjIwMTY0MjU=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)                  
              1. 第一次握手：客户端发送一个SYN报文，并指明客户端的ISN，客户端处于SYN_SENT状态
              2. 第二次握手：服务端收到客户端的SYN报文后，会发送一个SYN + ACK 报文，指定服务端的ISN，把ISN + 1作为ACK的值一起发送，服务端处于SYN_RCVD状态
              3. 第三次握手：客户端收到服务端的SYN报文后，会发送一个ACK报文，把ISN + 1作为ACK的值一起发送，客户端处于ESTABLISHED状态，收到报文后，服务端处于ESTABLISHED状态  
              ![四次挥手](https://pics5.baidu.com/feed/48540923dd54564e5260495ce0006487d0584fb6.jpeg?token=c3a743af38e25ff66deb6a07891be58e&s=C584FC1A71CFF4EE1A75A45203007073)
              1. 第一次挥手: 客户端发送一个FIN报文，指定一个序列号seq,并停止再发送数据，进入FIN_WAIT1状态，等待服务器确认  
              2. 第二次挥手：服务端收到客户端的FIN报文后, 会发送一个ACK报文，把seq + 1作为ACK的值一起发送，服务端处于CLOSE_WAIT 状态，客户端收到服务端的连接释放确认后，进入FIN_WAIT2
              3. 第三次挥手：服务费数据都接收完后，发送一个FIN报文，指定一个序列号，此时服务端进入LAST_ACK,等待客户端确认
              4. 第四次挥手：客户端收到FIN,一样会ACK报文，此时客户端进入TIME_WAIT，需要经过时间等待计时器设置的时间2MSL后，客户端才进入CLOSED状态。服务端收到FIN报文后，处于CLOSED状态
   5. 应用层  
        TCP/UDP协议可以传递各种程序的数据包，就像邮箱/网页/FTP等等，所以就需要不同的协议来规定数据的格式，收到后才能渲染解读，应用层就是由这些协议构成，它的数据包放在UDP包/TCP包的 数据 中
      1. DNS  
         是一种组织成域层次结构的计算机和网络服务命名系统，用于 TCP/IP 网络，作为将域名和IP地址相互映射的一个分布式数据库，它所提供的服务是用来将 主机名 和 域名 转换为 IP地址 的工作  
         为什么使用DNS? 因为IP是一串数字，不好记，多的话记不过来。  
         DNS解析流程： 因为DNS解析的流程有很多步骤，每次都要进行这个多步骤是很耗时间的，所以DNS有多级缓存的概念  
         1. 浏览器缓存 
            1. 当用户通过浏览器访问 www.qq.com 时，浏览器首先会在自己缓存中查找是否有该域名对应的IP地址
            2. 若曾经访问过该域名且没有清空缓存便存在，不存在则继续下一步
         2. 系统缓存  
            当浏览器缓存中无域名对应IP则会自动检查用户计算机系统 Hosts 文件DNS缓存是否有该域名对应IP 
         3. 路由器缓存  
            当浏览器及系统缓存中均无域名对应IP则进入路由器缓存中检查，以上三步均为客服端的DNS缓存
         4. 互联网服务提供商 ( ISP ) DNS缓存  
            1. 当在用户客服端查找不到域名对应IP地址，则将进入互联网服务提供商 ( ISP ) DNS缓存中进行查询
            2 .比如你用的是电信的网络，则会进入电信的DNS缓存服务器中进行查找
         5. 根域名服务器  
            1. 当以上均未完成，则进入根服务器进行查询
            2. 根域名服务器收到请求后会查看区域文件记录，若无则将其管辖范围内顶级域名 ( .com ) 服务器IP告诉本地DNS服务器   
         6. 顶级域名服务器  
            顶级域名服务器收到请求后查看区域文件记录，若无则将其管辖范围内主域名（ qq.com ）服务器的IP地址告诉本地DNS服务器   
         7. 主域名服务器  
            主域名服务器接受到请求后查询自己的缓存，如果没有则进入下一级域名服务器（ www.qq.com ）进行查找，并重复该步骤直至找到正确纪录   
         8. 保存结果至缓存  
            本地域名服务器把返回的结果保存到缓存，以备下一次使用，同时将该结果反馈给客户端，客户端通过这个IP地址与Web服务器建立链接   
      2. DNS解析优化  
         很多小型网站，DNS解析时间都接近 0.5s，有些甚至需要 1s 左右才可以解析出结果，一般网站用户的等待时间超过 8s 就会放弃访问，
         而对于电子商务网站，4s 就是用户忍耐极限，而一般经过优化的小型网站，DNS解析时间都可以控制在 200ms 左右，而带宽在 100M 左右的网站，经过优化，DNS解析时间可以控制在 50~100ms
         1. DNS解析优化-善用缓存之TTL   
            TTL表示DNS服务器解析域名时记录在DNS服务器上的缓存时间  根据自己有无备份设置，一般设置 TTL 3600，有备份设置短点，设置TTL600
         2. DNS解析优化-负载均衡  
         在DNS服务器中为同一个主机名配置多个IP地址，在应答DNS查询时，DNS服务器对每个查询将以DNS文件中主机记录的IP地址按顺序返回不同的解析结果，
         将客户端的访问引导到不同的机器上去，使得不同的客户端访问不同的服务器，从而达到负载均衡的目的，可以根据每台机器的负载量或该机器离用户地理位置的距离入手
     
### 二:页面渲染 

1.渲染优化 ![渲染流程图](https://user-images.githubusercontent.com/22701388/99356852-d7518d80-28e5-11eb-9cef-c5d9874b6cf6.png)
   1. 解析HTML构建DOM树  
      浏览器拿到HTML字节，根据文件编码(如UTF-8)转成对应的字符，接下来进行*词法解析*和*语法解析*,生成DOM树
   2. CSS构建CSSOM树  
      CSS 字节转换成字符，接着词法解析与法解析，最后构成 CSS对象模型(CSSOM) 的树结构。因为节点样式是可以继承的，构建过程会递归确定所有样式，为了CSSOM的完整性，
      即使DOM构建完成了，也要等CSSOM构建完才会进入下一阶段。也就是说CSS资源的加载会阻碍页面的渲染。  
      怎么优化？DOM树要小，CSS尽量用 id 和 class， 少直接用标签  
   3. 解析JavaScript脚本  
      解析JS的步骤不是固定的，在构建DOM树的过程中，当HTML解析器遇到一个script标签时，会阻塞DOM构建，将控制权交给JavaScript引擎，执行JavaScript代码。为什么要这
      样做？JS会对DOM节点进行操作，浏览器无法预测未来的DOM节点的具体内容，为了防止无效操作，节省资源，只能阻塞DOM树的构建。所以script如果下写在head，会阻塞页面的
      渲染，一般将 JS 文件放到HTML 底部进行加载，或是对 JS 文件执行 async 或 defer 加载
      1. async 是异步执行，异步下载完后就会执行，不确保执行顺序，一定在 onload 前，但不确定在 DOMContentLoaded 事件的前或后
      2. defer 是延迟执行，在浏览器看起来的效果像是将脚本放在了 body 后面一样（虽然按规范应该是在 DOMContentLoaded 事件前，但实际上不同浏览器的优化效果不一样，也有可能在它后面）
      3.(DOMContentLoaded事件，脚本执行完后触发，不需要等待图片等其他资源加载完成。 onload事件,脚本执行完后触发,需要等待图片等其他资源加载完成)
   4. 渲染树  ![渲染树](https://pic1.zhimg.com/80/v2-08c458e16aa42f339a7730df0679d334_720w.jpg)   
      CSSOM 树和 DOM 树 合并成渲染树，渲染树 只包含渲染网页所需的节点，然后用于计算每个可见元素的布局，并输出给绘制流程，将像素渲染到屏幕上
      (但并不是必须等 DOM树 及 CSSOM树 加载完成后才开始合并构建 渲染树，三者的构建并无先后条件，也并非完全独立，而是会有交叉，并行构建，因此会形成一边加载，一边解析，一边渲染的工作现象)
   5. 布局
      渲染树 同时包含了屏幕上的所有可见内容及其样式信息，有了渲染树，再接着就要进入布局 ( layout ) 阶段了，到目前为止，
      我们计算了哪些节点应该是可见的以及它们的计算样式，但我们还没有计算它们在设备 视口 内的确切位置和大小，这就是 布局 ( Layout ) 阶段，也称为 自动重排 或 回流 ( Reflow )
   6. 绘制 
      前几步我们知道了哪些节点可见、它们的计算样式以及几何信息，我们将这些信息传递给最后一个阶段将渲染树中的每个节点转换成屏幕上的实际像素，也就是俗称的 绘制 或 栅格化
      1. 重绘(Repaint)   
         元素发生的改变只是影响了元素的一些外观之类的时候（例如，背景色，边框颜色，文字颜色等），此时只需要应用新样式绘制这个元素就可以了，这叫做 重绘 ( Repaint )
      2. 回流(Reflow)   
         回流 一定伴随着 重绘 ，重绘 却可以单独出现，对比来看，显然回流的成本开销要高于重绘，而且一个节点的回流往往还会导致子节点以及同级节点的回流，
         所以优化方案中一般都包括，尽量避免 回流
   7. 合成 
      浏览器会将各层信息发送给GPU，GPU将各层合成，显示在屏幕上      
      1. 普通图层和复合图层
         普通文档流大家就可以理解为一个复合图层，我们叫它默认复合层，因为里面不管添加多少元素，其实都是在同一个复合图层中，absolute 布局、 fixed 也一样，
         虽然可以脱离普通文档流，但它仍然属于 默认复合层  
          
         复合图层，可以独立于普通文档流中，改动后可以避免整个页面重绘，提升性能，但也不要大量使用复合图层，否则由于资源消耗过度，页面反而会变的更卡，因小失大  
         
         GPU中，各个复合图层是单独绘制的，所以也互不影响，通过 硬件加速 的方式，会声明一个 新的复合图层 ，它会单独分配资源，当然也会脱离普通文档流，这样一来，
         不管这个复合图层中怎么变化，也不会影响 默认复合层 里的回流重绘
    
         
         
      
