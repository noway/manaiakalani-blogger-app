const MAX_RESULTS_PER_PAGE = 50;

export class Blogs {
  static _listByUser() {
    return new Promise((resolve, reject) => {
      const request = window.gapi.client.request({
        path: '/blogger/v3/users/self/blogs',
        method: 'GET',
        params: {}
        // We are assuming user can't have too many of blogs
      });

      request.execute((resp) => {  
        resolve(resp);
      });

      // TODO: error handling?
    });
  } 

  // Tested manually by Ilia
  static async getMyFirstBlog() {
    const listByUserData = await Blogs._listByUser();
    const myBlogs = listByUserData.items;
    return myBlogs[0];
  }
}

export class Posts {

  // Tested manually by Ilia
  static list(blogId, status) {
    return new Promise((resolve, reject) => {
      const request = window.gapi.client.request({
        path: `/blogger/v3/blogs/${blogId}/posts`,
        method: 'GET',
        params: {
          // maxResults: MAX_RESULTS_PER_PAGE,
          view: 'AUTHOR',
          blogId,
          status,
        }
      });

      request.execute((resp) => {  
        resolve(resp);
      });
    });
  }

  // Tested manually by Ilia
  static insert(blogId, { title, content, published, labels }, isDraft) {
    const post = {
      kind: "blogger#post",
      blog: {
        id: blogId
      },
      published,
      title,
      content,
      labels,
    };

    return new Promise((resolve, reject) => {
      const request = window.gapi.client.request({
        path: `/blogger/v3/blogs/${blogId}/posts`,
        method: 'POST',
        params: {
          blogId,
          isDraft,
        },
        body: post,
      });

      request.execute((resp) => {  
        resolve(resp);
      });
    });
  }

  // Tested manually by Ilia
  static updateAndPossiblyRevertToDraft(blogId, post, isDraft) {
    const postId = post.id;

    return new Promise((resolve, reject) => {
      const request = window.gapi.client.request({
        path: `/blogger/v3/blogs/${blogId}/posts/${post.id}`,
        method: 'PUT',
        params: {
          blogId,
          postId,
        },
        body: post,
      });

      request.execute((resp) => {  
        if (isDraft) {
          const request = window.gapi.client.request({
            path: `/blogger/v3/blogs/${blogId}/posts/${post.id}/revert`,
            method: 'POST',
            params: {
              blogId,
              postId: post.id,
            },
          });

          request.execute((resp) => {  
            resolve(resp);
          });

        } else {
          resolve(resp);          
        }
      });
    });
  }

  // Tested manually by Ilia
  static delete(blogId, postId) {
    return new Promise((resolve, reject) => {
      const request = window.gapi.client.request({
        path: `/blogger/v3/blogs/${blogId}/posts/${postId}`,
        method: 'DELETE',
        params: {
          blogId,
          postId,
        },
      });

      request.execute((resp) => {  
        resolve(resp);
      });
    });
  }

  // Tested manually by Ilia
  static get(blogId, postId) {
    return new Promise((resolve, reject) => {
      const request = window.gapi.client.request({
        path: `/blogger/v3/blogs/${blogId}/posts/${postId}`,
        method: 'GET',
        params: {
          view: 'AUTHOR',
          blogId,
          postId,
        },
      });

      request.execute((resp) => {  
        resolve(resp);
      });
    });
  }


}
