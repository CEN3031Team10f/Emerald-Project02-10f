import { handleGalleryPost } from '../../components/ActivityPanels/Utils/helpers';
import { message } from 'antd';

async function createGalleryObject(title, user_name, like_count, view_count, visibility, type, classroomId, workspaceRef) {

  //**********create default discussion board here
  const discussion_board = [];
  

    const data = {
    Title: title, 
    User_name: user_name,
    like_count: like_count,
    view_count: view_count,
    discussion_board: discussion_board,
    visibility: visibility,
    type: type,
    classroom_id: classroomId,
  };

  console.log(data);

//alert("type:"+typeof workspaceRef);
 try {
      const res = await handleGalleryPost(data, workspaceRef);
      console.log('response: at createGalleryObject ', res.err);
      if (res.err) {
      message.error(res.err);
    } else {
      message.success('Posted to gallery successsfully.');
    }
    } catch (error) {
      console.error('Error making the POST request:', error);
    }
}

export default createGalleryObject;
