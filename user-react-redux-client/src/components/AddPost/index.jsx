import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import red from '@material-ui/core/colors/red';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import classNames from 'classnames';
import './index.css';
import axios from 'axios';
import { API } from '../../utils/constants';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = {
   container:{
       flex: 1,
   },
   userContainer:{
    display: 'flex',
     flexDirection: 'column',
     width:'100%',
   },
   userDiv:{
       display: 'flex',
       flexDirection: 'row',
       width:'100%',
       padding: 10,
       height:'100%'
   },
   avatar: {
    backgroundColor: red[500],
  },
  fullname:{

  },
  userNameDiv:{
      alignSelf: 'center',
      padding: 4,
  },
  inputTextContainer:{
      width:'100%',
      flexDirection: 'column',
      padding: 10,
      backgroundColor: 'white',
  },
  textField:{
      width:'100%',
      
  },
  AddIcon:{
      display: 'block',
  },
  addMedia:{
      display: 'flex',
      justifyContent: 'flex-start',
      padding: 1,
      backgroundColor:'white'
  },
  submitBtnDiv:{
      display: 'block',
      textAlign:'center',
      marginTop: 50,
      padding: 2,
  },
  submitbutton:{
      width:'99%'
  },
  fileInput:{
      opacity:0,
    display: 'block',
    filter: 'alpha(opacity=0)',
    position:'absolute',
    width:'100%',
    height:'100%'
  },
  progressDiv:{
      margin: 15,
  }
}

class AddPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files:[],
            uploadProgress:0,
            tempBinary:null
        }
    }
    
    componentDidMount(){
        this.props.mappedupdateAppTitle('Create Post');
    }

    setFiles(event){
        this.setState({
            files:this.state.files.concat(Array.from(event.target.files))
        })
    }
   

    handleImageChange(event){
      var _this = this;
      let files = event.target.files;
      for (let index = 0; index < files.length; index++) {
          const currentItem = files[index];
             var reader = new FileReader();
             reader.onload = (r) => {
            let newElement = {
                key:currentItem.size+currentItem.lastModified,
                lastModified:currentItem.lastModified,
                size:currentItem.size,
                preview:r.target.result,
                uploadProgress:0
            }
            console.log(newElement)
            let newArray = [ ...this.state.files, newElement ];
             _this.setState({
                 files:newArray
             })
             _this.handleUpload(currentItem, _this);
            }
            reader.readAsDataURL(currentItem);
      }
      console.log(this.state.files)
    }


    handleUpload(file, _this){
      console.log(file);
      let key = file.size+file.lastModified;
      console.log(key);
      var output = document.getElementById('output');
        const data = new FormData();
        data.append('file', file);
        data.append('user', this.props.auth.user._id);

        var config = {
            onUploadProgress: function(progressEvent) {
              var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
              let progress = percentCompleted + '%'; 
                let files = _this.state.files.map((f) => {
                    if (f.key === key) {
                        f.uploadProgress = percentCompleted;
                        return f;
                    }
                    return f;
                })
                _this.setState({
                    files:files
                })
            }
          };

          axios.post(`${API}/posts/v1/`, data, config)
          .then(function (res) {
            output.className = 'output';
            //output.innerHTML = res.data;
          })
          .catch(function (err) {
            output.className = 'output text-danger';
            output.innerHTML = err.message;
          });
    }

    render() {
        const { classes } = this.props;
        const { isLoggedIn, user, error } = this.props.auth;
        if(!user) return null;
        return (
            <div className={classes.container}>
            <div className={classes.userContainer}>
            <Card>
            <div className={classes.userDiv}>
            <div>
            <Avatar aria-label={user.firstname} className={classes.avatar}>
                {user.firstname.charAt(0)}
              </Avatar> 
            </div> 
              <div className={classes.userNameDiv}>
              <span className={classes.fullname}>
                    {`${user.firstname} ${user.lastname}`}
              </span>
              </div>
            </div>
            </Card>
            </div>
            
            <div className={classes.inputTextContainer}>
            <div>
            <TextField
          id="textarea"
          
          placeholder="What's on your mind?"
          multiline
          className={classes.textField}
          margin="normal"
        />
            </div>
            </div>

            <div className={classes.addMedia}>
            <div><div className="_5cqb"><span>
                <div aria-label="Add photo" className="_vbz" tabIndex="0">
                <input multiple onChange={e => this.handleImageChange(e)} accept="image/*" type="file" name="file" className={classes.fileInput}/><div className="_4g33"><div className="_2-24 _4g34 _5i2i _52we"><div className="_vbx"><div className="_vby"></div><div className="_vbw">Photo</div></div></div></div></div>

            <div aria-label="Add Video" className="_vbz"  tabIndex="0" role="button"><div className="_4g33">
            <input accept="video/*" type="file" className={classes.fileInput}/>
            <div className="_2-24 _4g34 _5i2i  _52we"><div className="_vbx"><div className="_vby"></div><div className="_vbw">Video</div></div></div></div></div></span></div>
        </div>
            </div>

        <div className={classes.submitBtnDiv}>
        <div id="output" className="output"></div>
        <Button variant="contained" size="large" color="primary" className={classes.submitbutton}>
          Post
        </Button>
        </div>
        {/* <div ariaLabel="Add photo" className="_vbz" tabIndex="0" role="button"><div className="_4g33"><div className="_2-24 _4g34 _5i2i  _52we"><div className="_vbx"><div className="_vby"></div><div className="_vbw">Photo</div></div></div></div></div> */}
        
        
         <div style={{display:'flex', flexDirection:'row'}}>
            {this.state.files && this.state.files.length > 0 &&
               this.state.files.map((item) => {
                   return (
                    <div style={{padding:4, backgroundColor:'white', margin:3}} key={item.key}>
                    <img src={item.preview} width='300' height='200'/>
                    <div>
                    <div style={{border:'1px solid #77B5EE'}} className='progress_outer'>
               <div style={{width:`${item.uploadProgress}%`, backgroundColor:'#77B5EE', height:20, transition:'width 2.5s ease'}} id='_progress' className='progress'></div>
               </div>
       
  </div>
                    </div>
                   )
               })
            } 
         </div>

        
            </div>
        );
    }
}

export default withStyles(styles)(AddPost);