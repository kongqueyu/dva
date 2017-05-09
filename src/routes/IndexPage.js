import React,{Component} from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';

class IndexPage extends Component {
  constructor(props) {
    super(props);
  }
  shareClick=()=>{
    if(confirm("分享到QQ")){
       this.confirmTrue();
    }else{
     console.log("取消成功");
    }
  };
  confirmTrue=()=>{
    alert("分享成功");
  };
  render() {
    const currentList=this.props.homeDate.homeCateList;
    let self=this;
    return (
      <ul className={styles.wrap}>
        <li className={styles.newsTitle}>热点</li>
        {
          currentList.map(function (value,id) {
            return(
              <li key={id} className={styles.tpList} style={{zIndex:100}}>
                <div className={styles.tpWrap}>
                  <a target="_blank" className={styles.pic} href={value.src2}>
                    <img className={styles.picto} src={value.src1}/>
                  </a>
                  <div className={styles.text}>
                    <em ><a target="_blank" href={value.src2}>{value.title}</a></em>
                    <div className={styles.st}>
                      <div className={styles.btns}>
                        <div className ={styles.shareBtn} onClick={self.shareClick}></div>
                      </div></div>
                  </div>
                </div>
              </li>
            )
          })
        }

      </ul>

    );
  }
}
function mapStateToProps(state){
  return state;
}
export default connect(mapStateToProps)(IndexPage);
