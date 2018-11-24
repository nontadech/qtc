import React,{ Component } from 'react'
import * as XLSX from 'xlsx';

/*
var ExcelToJSON = function () {

    this.parseExcel = function(file) {
      var reader = new FileReader();

      reader.onload = function(e) {
        var data = e.target.result;
        var workbook = XLSX.read(data, {
          type: 'binary'
        });
        workbook.SheetNames.forEach(function(sheetName) {
          // Here is your object
          var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
          var json_object = JSON.stringify(XL_row_object);
          console.log(JSON.parse(json_object));
          //console.log(json_object)
          //return JSON.parse(json_object)
        })
      };
      reader.onerror = function(ex) {
        console.log(ex);
      };
        reader.readAsBinaryString(file);
    };
};
*/

class ApprovePage extends Component {

  constructor(props) {
    super(props);
    this.state = { ex: [] };
  //  this.setInputState = this.setInputState.bind(this);
  }

  show  = () =>{
    console.log(this.state.ex)
  }
    handleSubmit = (evt) =>{
        var files = evt.target.files; // FileList object
        this.parseExcel = (files) => {
          var reader = new FileReader();
          reader.onload = (e) => {
            var data = e.target.result;
            var workbook = XLSX.read(data, {
              type: 'binary'
            });

            workbook.SheetNames.forEach((sheetName) => {


              // Here is your object
              var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
              var json_object = JSON.stringify(XL_row_object);
              JSON.parse(json_object).forEach((data,index, array) =>{
                //console.log(data);


                  this.setState(prevState => ({
                    ex: [...prevState.ex, data]
                  }))
              })

            })
          };

          reader.onerror = function(ex) {
            console.log(ex);
          };

            reader.readAsBinaryString(files);
        };

        this.parseExcel(files[0])
        /*
        var xl2json = new ExcelToJSON();
          */
      //  this.setState({data:xl2json.parseExcel(files[0])})


    }


    render(){
        return(
            <div>
                <input type="file" id="input" onChange={(e) => this.handleSubmit(e)} />
                <button onClick={this.show} >Show Data</button>
            </div>
        )
    }
}

export default ApprovePage
// exportcto excel
// https://www.youtube.com/watch?v=ZRjzV_1VNPE
