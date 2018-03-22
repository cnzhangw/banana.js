# banana.js

version 1.7

banana.js is a front-end framework tool set, you can save time for the development of a large number of details, which depends on jquery.

    <!--定义模版-->
    <script type="text/template" id="bodyTemplate">
        {{#.}}
        <tr>
            <td>{{name}}</td>
            <td>{{age}}</td>
            <td>{{genderFormat}}</td>
        </tr>
        {{/.}}
    </script>


            //模拟数据
            var data = [];
            for (var i = 0; i < 100; i++) {
                data.push({
                    name: 'user_' + i
                    , age: parseInt(Math.random() * 100)
                    , gender: (i % 2 === 0 ? 1 : 0)
                });
            }

            //使用extend函数格式化数据
            data.extend({
                genderFormat: function () {
                    return this.gender == 1 ? '男' : '女';
                }
            });

            //渲染表格
            banana.helper.mustacheRender({
                container: '#tbody' //表格容器选择器
                , view: data //数据
                , template: '#bodyTemplate' //模版选择器
            });
            
                <table>
        <thead>
            <tr>
                <th>姓名</th>
                <th>年龄</th>
                <th>性别</th>
            </tr>
        </thead>
        <tbody id="tbody">
            <tr>
                <td>加载中...</td>
            </tr>
        </tbody>
    </table>
