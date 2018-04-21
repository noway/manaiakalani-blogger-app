export class Blogs {
  static listByUser() {
    return new Promise((resolve, reject) => {
      var request = window.gapi.client.request({
        'path': '/blogger/v3/users/self/blogs',
        'method': 'GET',
        // 'params': {'maxResults': '50'}
        'params': {}
      });

      request.execute((respBlogger) => {  
        resolve(respBlogger);
      });

      // TODO: error handling?
    });
  } 

  static async getFirstBlogId() {
    const listByUserData = await Blogs.listByUser();
    const myBlogs = listByUserData.items;
    return myBlogs[0].id;
  }
}

export class Posts {

  static list(blogId, status) {
    return new Promise((resolve, reject) => {
      var request = window.gapi.client.request({
        'path': '/blogger/v3/blogs/${blogId}/posts',
        'method': 'GET',
        'params': {
          blogId,
          // status: ['draft', 'live', 'scheduled'],
          status,
        }
      });
      request.execute((respBlogger) => {  
        resolve(respBlogger);
      });
    });
  }

  static insert(blogId, isDraft) {
    var request = window.gapi.client.request({
      'path': '/blogger/v3/blogs/${blogId}/posts',
      'method': 'POST',
      // 'params': {'maxResults': '50'}
      'params': {
        blogId,
        isDraft,
      }
    });
  }

  static test() {
    return;
  }
}
