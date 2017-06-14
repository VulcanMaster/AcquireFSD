var Component = React.createClass({
    render: function(){
        return (
            <h1>Hello, world!</h1>
        );
    }
});

React.renderComponent(
    <Component/>,
    document.getElementById('myDiv')
);