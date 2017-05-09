import * as IndexService from '../services/index';
export default {

  namespace: 'homeDate',

  state: {
    homeCateList:[]

  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      return history.listen(({ pathname,query}) => {
        if(pathname==='/'){
          dispatch({ type: 'getHomeList',payload:{}});
        }
      });
    },
  },

  effects: {
    *getHomeList({payload:{}},{ call,put}){
      const result = yield call(IndexService.getHomeList, {});
      yield put({ type: 'homeList', payload: {result}});
    }
  },

  reducers: {
    homeList(state,{payload:{result}}){
       let category=result.categoryDTOs;
       let homeCateList=[];
      for(let i=0;i<category.length;i++){
        let list={};
        list.id=category[i].id;
        for(let j=0;j<category[i].multiLanguageCategoryItemDTOs.length;j++) {
          if( Object.values(category[i].multiLanguageCategoryItemDTOs[j]).indexOf('CHI')==0){
            list.title=category[i].multiLanguageCategoryItemDTOs[j].name;
          }
        }
        if(category[i].atomPosterResourceDTOs){
          for(let k=0;k<category[i].atomPosterResourceDTOs.length;k++){
            if(category[i].atomPosterResourceDTOs[k].horizontalResolution>300){
              list.src1=category[i].atomPosterResourceDTOs[k].resourceURL;
            }
            if(category[i].atomPosterResourceDTOs[k].horizontalResolution==60){
              list.src2=category[i].atomPosterResourceDTOs[k].resourceURL;
            }
          }
        }
        homeCateList.push(list);
      }
      return {...state,homeCateList:homeCateList};
    }
  },

};
