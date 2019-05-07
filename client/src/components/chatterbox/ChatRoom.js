import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import Message from './Message';

export class ChatRoom extends Component {
  static propTypes = {};

  render() {
    return (
      <div className='chat-room bg-brightred'>
        <div className='container-fluid h-100'>
          <div className='row h-100'>
            <div className='col-2 bg-dark'>
              <p>something</p>
            </div>
            <div className='col-8 h-100 shadow bg-darkgrey chat-container'>
              <div className='row flex flex-column justify-content-end h-100'>
                <div className='flex d-flex flex-column align-items-stretch messages-list'>
                  <Message
                    name='Natash Halvorson'
                    avatar='https://www.ekahiornish.com/wp-content/uploads/2018/07/default-avatar-profile-icon-vector-18942381.jpg'
                    text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga '
                    publishedtime='4:20'
                  />
                  <Message
                    me={true}
                    name='Eric Lannan'
                    avatar='https://www.ekahiornish.com/wp-content/uploads/2018/07/default-avatar-profile-icon-vector-18942381.jpg'
                    text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga facilis voluptatem porro neque ipsum magni quo hic exercitationem nobis harum quod impedit, excepturi ducimus dolore obcaecati fugiat alias accusamus reprehenderit!'
                    publishedtime='4:20'
                  />
                  <Message
                    name='Natash Halvorson'
                    avatar='https://www.ekahiornish.com/wp-content/uploads/2018/07/default-avatar-profile-icon-vector-18942381.jpg'
                    text='Lorem ipsum dolor sit amet consectetur adipisicing elit.  magni quo hic exercitationem nobis harum quod impedit, excepturi ducimus dolore obcaecati fugiat alias accusamus reprehenderit!'
                    publishedtime='4:20'
                  />
                  <Message
                    me={true}
                    name='Eric Lannan'
                    avatar='https://www.ekahiornish.com/wp-content/uploads/2018/07/default-avatar-profile-icon-vector-18942381.jpg'
                    text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga facilis voluptatem porro neque ipsum magni quo hic exercitationem nobis harum quod impedit, excepturi ducimus dolore obcaecati fugiat alias accusamus reprehenderit! ipsum dolor sit amet consectetur adipisicing elit. Fuga facilis voluptatem porro neque ipsum magni quo hic exercitationem nobis harum quod impedit, excepturi ducimus dolore obcaecati fugiat alias accusamus reprehenderit!'
                    publishedtime='4:20'
                  />
                  <Message
                    name='Natash Halvorson'
                    avatar='https://www.ekahiornish.com/wp-content/uploads/2018/07/default-avatar-profile-icon-vector-18942381.jpg'
                    text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga facilis voluptatem porro neque ipsum magni quo hic exercitationem nobis harum quod impe!'
                    publishedtime='4:20'
                  />
                  <Message
                    name='Natash Halvorson'
                    avatar='https://www.ekahiornish.com/wp-content/uploads/2018/07/default-avatar-profile-icon-vector-18942381.jpg'
                    text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga facilis voluptatem porro neque ipsum magni quo hic exercitationem nobis harum quod impedit, excepturi ducimus dolore obcaecati fugiat alias accusamus reprehenderit!'
                    publishedtime='4:20'
                  />
                  <Message
                    name='Natash Halvorson'
                    avatar='https://www.ekahiornish.com/wp-content/uploads/2018/07/default-avatar-profile-icon-vector-18942381.jpg'
                    text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga '
                    publishedtime='4:20'
                  />
                  <Message
                    me={true}
                    name='Eric Lannan'
                    avatar='https://www.ekahiornish.com/wp-content/uploads/2018/07/default-avatar-profile-icon-vector-18942381.jpg'
                    text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga facilis voluptatem porro neque ipsum magni quo hic exercitationem nobis harum quod impedit, excepturi ducimus dolore obcaecati fugiat alias accusamus reprehenderit!'
                    publishedtime='4:20'
                  />
                  <Message
                    name='Natash Halvorson'
                    avatar='https://www.ekahiornish.com/wp-content/uploads/2018/07/default-avatar-profile-icon-vector-18942381.jpg'
                    text='Lorem ipsum dolor sit amet consectetur adipisicing elit.  magni quo hic exercitationem nobis harum quod impedit, excepturi ducimus dolore obcaecati fugiat alias accusamus reprehenderit!'
                    publishedtime='4:20'
                  />
                  <Message
                    me={true}
                    name='Eric Lannan'
                    avatar='https://www.ekahiornish.com/wp-content/uploads/2018/07/default-avatar-profile-icon-vector-18942381.jpg'
                    text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga facilis voluptatem porro neque ipsum magni quo hic exercitationem nobis harum quod impedit, excepturi ducimus dolore obcaecati fugiat alias accusamus reprehenderit! ipsum dolor sit amet consectetur adipisicing elit. Fuga facilis voluptatem porro neque ipsum magni quo hic exercitationem nobis harum quod impedit, excepturi ducimus dolore obcaecati fugiat alias accusamus reprehenderit!'
                    publishedtime='4:20'
                  />
                  <Message
                    name='Natash Halvorson'
                    avatar='https://www.ekahiornish.com/wp-content/uploads/2018/07/default-avatar-profile-icon-vector-18942381.jpg'
                    text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga facilis voluptatem porro neque ipsum magni quo hic exercitationem nobis harum quod impe!'
                    publishedtime='4:20'
                  />
                  <Message
                    name='Natash Halvorson'
                    avatar='https://www.ekahiornish.com/wp-content/uploads/2018/07/default-avatar-profile-icon-vector-18942381.jpg'
                    text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga facilis voluptatem porro neque ipsum magni quo hic exercitationem nobis harum quod impedit, excepturi ducimus dolore obcaecati fugiat alias accusamus reprehenderit!'
                    publishedtime='4:20'
                  />
                  <Message
                    name='Natash Halvorson'
                    avatar='https://www.ekahiornish.com/wp-content/uploads/2018/07/default-avatar-profile-icon-vector-18942381.jpg'
                    text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga '
                    publishedtime='4:20'
                  />
                  <Message
                    me={true}
                    name='Eric Lannan'
                    avatar='https://www.ekahiornish.com/wp-content/uploads/2018/07/default-avatar-profile-icon-vector-18942381.jpg'
                    text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga facilis voluptatem porro neque ipsum magni quo hic exercitationem nobis harum quod impedit, excepturi ducimus dolore obcaecati fugiat alias accusamus reprehenderit!'
                    publishedtime='4:20'
                  />
                  <Message
                    name='Natash Halvorson'
                    avatar='https://www.ekahiornish.com/wp-content/uploads/2018/07/default-avatar-profile-icon-vector-18942381.jpg'
                    text='Lorem ipsum dolor sit amet consectetur adipisicing elit.  magni quo hic exercitationem nobis harum quod impedit, excepturi ducimus dolore obcaecati fugiat alias accusamus reprehenderit!'
                    publishedtime='4:20'
                  />
                  <Message
                    me={true}
                    name='Eric Lannan'
                    avatar='https://www.ekahiornish.com/wp-content/uploads/2018/07/default-avatar-profile-icon-vector-18942381.jpg'
                    text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga facilis voluptatem porro neque ipsum magni quo hic exercitationem nobis harum quod impedit, excepturi ducimus dolore obcaecati fugiat alias accusamus reprehenderit! ipsum dolor sit amet consectetur adipisicing elit. Fuga facilis voluptatem porro neque ipsum magni quo hic exercitationem nobis harum quod impedit, excepturi ducimus dolore obcaecati fugiat alias accusamus reprehenderit!'
                    publishedtime='4:20'
                  />
                  <Message
                    name='Natash Halvorson'
                    avatar='https://www.ekahiornish.com/wp-content/uploads/2018/07/default-avatar-profile-icon-vector-18942381.jpg'
                    text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga facilis voluptatem porro neque ipsum magni quo hic exercitationem nobis harum quod impe!'
                    publishedtime='4:20'
                  />
                  <Message
                    name='Natash Halvorson'
                    avatar='https://www.ekahiornish.com/wp-content/uploads/2018/07/default-avatar-profile-icon-vector-18942381.jpg'
                    text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga facilis voluptatem porro neque ipsum magni quo hic exercitationem nobis harum quod impedit, excepturi ducimus dolore obcaecati fugiat alias accusamus reprehenderit!'
                    publishedtime='4:20'
                  />
                  <Message
                    name='Natash Halvorson'
                    avatar='https://www.ekahiornish.com/wp-content/uploads/2018/07/default-avatar-profile-icon-vector-18942381.jpg'
                    text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga '
                    publishedtime='4:20'
                  />
                  <Message
                    me={true}
                    name='Eric Lannan'
                    avatar='https://www.ekahiornish.com/wp-content/uploads/2018/07/default-avatar-profile-icon-vector-18942381.jpg'
                    text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga facilis voluptatem porro neque ipsum magni quo hic exercitationem nobis harum quod impedit, excepturi ducimus dolore obcaecati fugiat alias accusamus reprehenderit!'
                    publishedtime='4:20'
                  />
                  <Message
                    name='Natash Halvorson'
                    avatar='https://www.ekahiornish.com/wp-content/uploads/2018/07/default-avatar-profile-icon-vector-18942381.jpg'
                    text='Lorem ipsum dolor sit amet consectetur adipisicing elit.  magni quo hic exercitationem nobis harum quod impedit, excepturi ducimus dolore obcaecati fugiat alias accusamus reprehenderit!'
                    publishedtime='4:20'
                  />
                  <Message
                    me={true}
                    name='Eric Lannan'
                    avatar='https://www.ekahiornish.com/wp-content/uploads/2018/07/default-avatar-profile-icon-vector-18942381.jpg'
                    text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga facilis voluptatem porro neque ipsum magni quo hic exercitationem nobis harum quod impedit, excepturi ducimus dolore obcaecati fugiat alias accusamus reprehenderit! ipsum dolor sit amet consectetur adipisicing elit. Fuga facilis voluptatem porro neque ipsum magni quo hic exercitationem nobis harum quod impedit, excepturi ducimus dolore obcaecati fugiat alias accusamus reprehenderit!'
                    publishedtime='4:20'
                  />
                  <Message
                    name='Natash Halvorson'
                    avatar='https://www.ekahiornish.com/wp-content/uploads/2018/07/default-avatar-profile-icon-vector-18942381.jpg'
                    text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga facilis voluptatem porro neque ipsum magni quo hic exercitationem nobis harum quod impe!'
                    publishedtime='4:20'
                  />
                  <Message
                    name='Natash Halvorson'
                    avatar='https://www.ekahiornish.com/wp-content/uploads/2018/07/default-avatar-profile-icon-vector-18942381.jpg'
                    text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga facilis voluptatem porro neque ipsum magni quo hic exercitationem nobis harum quod impedit, excepturi ducimus dolore obcaecati fugiat alias accusamus reprehenderit!'
                    publishedtime='4:20'
                  />
                  <Message
                    name='Natash Halvorson'
                    avatar='https://www.ekahiornish.com/wp-content/uploads/2018/07/default-avatar-profile-icon-vector-18942381.jpg'
                    text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga '
                    publishedtime='4:20'
                  />
                  <Message
                    me={true}
                    name='Eric Lannan'
                    avatar='https://www.ekahiornish.com/wp-content/uploads/2018/07/default-avatar-profile-icon-vector-18942381.jpg'
                    text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga facilis voluptatem porro neque ipsum magni quo hic exercitationem nobis harum quod impedit, excepturi ducimus dolore obcaecati fugiat alias accusamus reprehenderit!'
                    publishedtime='4:20'
                  />
                  <Message
                    name='Natash Halvorson'
                    avatar='https://www.ekahiornish.com/wp-content/uploads/2018/07/default-avatar-profile-icon-vector-18942381.jpg'
                    text='Lorem ipsum dolor sit amet consectetur adipisicing elit.  magni quo hic exercitationem nobis harum quod impedit, excepturi ducimus dolore obcaecati fugiat alias accusamus reprehenderit!'
                    publishedtime='4:20'
                  />
                  <Message
                    me={true}
                    name='Eric Lannan'
                    avatar='https://www.ekahiornish.com/wp-content/uploads/2018/07/default-avatar-profile-icon-vector-18942381.jpg'
                    text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga facilis voluptatem porro neque ipsum magni quo hic exercitationem nobis harum quod impedit, excepturi ducimus dolore obcaecati fugiat alias accusamus reprehenderit! ipsum dolor sit amet consectetur adipisicing elit. Fuga facilis voluptatem porro neque ipsum magni quo hic exercitationem nobis harum quod impedit, excepturi ducimus dolore obcaecati fugiat alias accusamus reprehenderit!'
                    publishedtime='4:20'
                  />
                  <Message
                    name='Natash Halvorson'
                    avatar='https://www.ekahiornish.com/wp-content/uploads/2018/07/default-avatar-profile-icon-vector-18942381.jpg'
                    text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga facilis voluptatem porro neque ipsum magni quo hic exercitationem nobis harum quod impe!'
                    publishedtime='4:20'
                  />
                  <Message
                    name='Natash Halvorson'
                    avatar='https://www.ekahiornish.com/wp-content/uploads/2018/07/default-avatar-profile-icon-vector-18942381.jpg'
                    text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga facilis voluptatem porro neque ipsum magni quo hic exercitationem nobis harum quod impedit, excepturi ducimus dolore obcaecati fugiat alias accusamus reprehenderit!'
                    publishedtime='4:20'
                  />
                </div>
                <div>
                  <form className=''>
                    <div className='d-flex justify-content-center p-1 mt-2'>
                      <div className='col-10'>
                        <input
                          type='text'
                          className='form-control mb-2'
                          id='inlineFormInput'
                          placeholder='Message'
                        />
                      </div>

                      <div className='col-2'>
                        <button
                          type='submit'
                          className='btn btn-block btn-brightred mb-2'
                        >
                          Send
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className='col-2 bg-dark'>
              <p>something</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ChatRoom;
