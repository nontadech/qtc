import React,{Component} from 'react'

import { Tree } from 'antd';

const TreeNode = Tree.TreeNode;

function findObjectById(root, id) {
  if (root.key == id){
    return root;
  }
  if (root.children) {
    for (var k in root.children) {
      if (root.children[k].key == id) {
        return root.children[k];
      }
      else if (root.children[k].children) {
        var result = findObjectById(root.children[k], id);
        if (result) {
          return result;
        }
      }
    }
  }
};


class Home extends Component {


    state = {
        treeData: [{
          title: "root",
          key: '1',
          children: []
        }],
        keyname:null
      }

    onSelect = (selectedKeys, info) => {
        //console.log('selected', selectedKeys, info);
        this.setState({keyname:selectedKeys})
      }

      renderTreeNodes = (data) => {
        return data.map((item) => {
          if (item.children) {
            return (
              <TreeNode title={item.title} key={item.key} dataRef={item}>
                {this.renderTreeNodes(item.children)}
              </TreeNode>
            );
          }
          return <TreeNode {...item} dataRef={item} />;
        });
      }
    
      deleteItem =(e)=> {
        var object = this.state.treeData

        var key = this.state.keyname

        object.forEach(function(result) {
          result.children = result.children.filter(s => s.key != key);
        });
        this.setState({treeData:object})
          console.log(object);
      }


      addItem =(e)=>{

      var ob = this.state.treeData[0]

      var bla = findObjectById(ob, this.state.keyname);

console.log(bla);
bla.children.push({
        title: "default",
        key: '1111',
        children: []
});
console.log(ob);
this.setState({treeData:[ob]})
      
      }
      
    render(){

    //console.log(this.state.treeData)
        return (
            <div>

                <Tree
        showLine
        defaultExpandAll={true}
        onSelect={this.onSelect}
      >
        {this.renderTreeNodes(this.state.treeData)}
      </Tree>
      {this.state.keyname}
      <button onClick={(e)=>this.addItem(e)}>Add</button>
      <button onClick={(e)=>this.deleteItem(e)}>Del</button>
            </div>
        )
    }
}

export default Home