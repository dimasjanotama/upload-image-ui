import React, { Component } from 'react'
import Axios from 'axios'
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

var urlApi = 'http://localhost:8080/'
class App extends Component {


  state = {
    productName: '',
    selectedFile: null,
    dataPic: []
  }

  componentDidMount (){
    Axios.get('http://localhost:8080/getdata')
    .then(res=>{
      this.setState({
        dataPic: res.data
      })
      console.log(res.data[0].image);
      
    }).catch(err=>{
    console.log(err);
  })
  }

  onSubmit = ()=>{
    var fd = new FormData()
    fd.append('aneh', this.state.selectedFile, this.state.selectedFile.name)
    fd.append('productName', this.state.productName)
    Axios.post('http://localhost:8080/uploadimage', fd)
    .then(res=>{
      console.log(res);
      alert('berhasil aplod foto produk')
    })
    .catch(err=>{
      console.log(err);
    })
  }

  renderList = () => {
      let hasil = this.state.dataPic.map((obj,ind)=>{
          return (
            <tr>
              <td>{ind+1}</td>
              <td>{obj.productName}</td>
              <td><img style={{width: '250px'}} src={urlApi + 'files/' + obj.image.split('.')[0] + '.' + obj.image.split('.')[1]} alt="fotoproduk"/></td>
            </tr>
          )
    })
    return hasil
  }

  render(){
    return (
        <div className='container'>
          <div className='row'>
            <div className='col'>
              <h1>Input Produk</h1> 
            </div>
            <div className='w-100'></div>
            <div className='col'>
              Nama Produk : <input onChange={e=> this.setState({productName: e.target.value})} className='form-control w-25' type="text" placeholder='Masukkan nama produk'/>
            </div>
            <div className='w-100 pt-4'></div>
            <div className='col-2'>
              <input type='file' ref='fileBtn' className='d-none' onChange={(e)=> this.setState({selectedFile: e.target.files[0]})}/>
              <input type='button' onClick={() => this.refs.fileBtn.click()} value='select a file' className='btn btn-block btn-primary'/>
            </div>
            <div className='col-2'>
              <input type="button" onClick={this.onSubmit} value='Submit' className='btn btn-block btn-success'/>
            </div>
          </div>

          <h1 className='pt-5'>Daftar Produk</h1>
          <table className='table pt-5'>
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Produk</th>
                <th>Foto Produk</th>
              </tr>
            </thead>
            <tbody>
              {this.renderList()}
            </tbody>
          </table>


        </div>
    )
  }
}

export default App;
