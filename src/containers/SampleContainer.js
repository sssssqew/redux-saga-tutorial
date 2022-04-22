import { connect } from 'react-redux'
import Sample from '../components/Sample'
import { getPost, getUsers } from '../modules/sample'
import { useEffect } from 'react'

const SampleContainer = ({ post, users, loadingPost, loadingUsers, getPost, getUsers }) => {
  useEffect(() => {
    const fn = async () => {
      try{
        getPost(1)
        getUsers()
      }catch(e){
        console.log(e)
      }
    }
    fn()
  }, [getPost, getUsers])

  return <Sample loadingPost={loadingPost} loadingUsers={loadingUsers} post={post} users={users}/>

}

export default connect(
  ({ sample, loading }) => ({
    post: sample.post,
    users: sample.users,
    loadingPost: loading['sample/GET_POST'],
    loadingUsers: loading['sample/GET_USERS']
  }),
  {
    getPost,
    getUsers
  }
)(SampleContainer)