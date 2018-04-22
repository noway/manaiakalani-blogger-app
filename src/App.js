import React, { Component } from 'react';

import {Blogs, Posts} from './api/blogger'
import Navigation from './Navigation'
import FirstLogin from './FirstLogin'
import * as moment from 'moment';
import fetchJsonp from 'fetch-jsonp'

const ALL_AUDIO_MIME_TYPES='audio/flac,audio/mpegurl,audio/mp4,audio/mpeg,audio/ogg,audio/x-scpls,audio/wav,audio/webm,audio/x-ms-wma,application/xspf+xml,audio/x-mpeg,audio/mp3,audio/x-mp3,audio/mpeg3,audio/x-mpeg3,audio/mpg,audio/x-mpg,audio/x-mpegaudio,audio/1d-interleaved-parityfec,audio/32kadpcm,audio/3gpp,audio/3gpp2,audio/aac,audio/ac3,audio/AMR,audio/AMR-WB,audio/amr-wb+,audio/aptx,audio/asc,audio/ATRAC-ADVANCED-LOSSLESS,audio/ATRAC-X,audio/ATRAC3,audio/basic,audio/BV16,audio/BV32,audio/clearmode,audio/CN,audio/DAT12,audio/dls,audio/dsr-es201108,audio/dsr-es202050,audio/dsr-es202211,audio/dsr-es202212,audio/DV,audio/DVI4,audio/eac3,audio/encaprtp,audio/EVRC,audio/EVRC-QCP,audio/EVRC0,audio/EVRC1,audio/EVRCB,audio/EVRCB0,audio/EVRCB1,audio/EVRCNW,audio/EVRCNW0,audio/EVRCNW1,audio/EVRCWB,audio/EVRCWB0,audio/EVRCWB1,audio/EVS,audio/example,audio/fwdred,audio/G711-0,audio/G719,audio/G7221,audio/G722,audio/G723,audio/G726-16,audio/G726-24,audio/G726-32,audio/G726-40,audio/G728,audio/G729,audio/G729D,audio/G729E,audio/GSM,audio/GSM-EFR,audio/GSM-HR-08,audio/iLBC,audio/ip-mr_v2.5,audio/L8,audio/L16,audio/L20,audio/L24,audio/LPC,audio/MELP,audio/MELP600,audio/MELP1200,audio/MELP2400,audio/mobile-xmf,audio/MPA,audio/MP4A-LATM,audio/mpa-robust,audio/mpeg4-generic,audio/opus,audio/PCMA,audio/PCMA-WB,audio/PCMU,audio/PCMU-WB,audio/prs.sid,audio/raptorfec,audio/RED,audio/rtp-enc-aescm128,audio/rtploopback,audio/rtp-midi,audio/rtx,audio/SMV,audio/SMV0,audio/SMV-QCP,audio/sp-midi,audio/speex,audio/t140c,audio/t38,audio/telephone-event,audio/tone,audio/UEMCLIP,audio/ulpfec,audio/usac,audio/VDVI,audio/VMR-WB,audio/vnd.3gpp.iufp,audio/vnd.4SB,audio/vnd.audiokoz,audio/vnd.CELP,audio/vnd.cisco.nse,audio/vnd.cmles.radio-events,audio/vnd.cns.anp1,audio/vnd.cns.inf1,audio/vnd.dece.audio,audio/vnd.digital-winds,audio/vnd.dlna.adts,audio/vnd.dolby.heaac.1,audio/vnd.dolby.heaac.2,audio/vnd.dolby.mlp,audio/vnd.dolby.mps,audio/vnd.dolby.pl2,audio/vnd.dolby.pl2x,audio/vnd.dolby.pl2z,audio/vnd.dolby.pulse.1,audio/vnd.dra,audio/vnd.dts,audio/vnd.dts.hd,audio/vnd.dvb.file,audio/vnd.everad.plj,audio/vnd.hns.audio,audio/vnd.lucent.voice,audio/vnd.ms-playready.media.pya,audio/vnd.nokia.mobile-xmf,audio/vnd.nortel.vbk,audio/vnd.nuera.ecelp4800,audio/vnd.nuera.ecelp7470,audio/vnd.nuera.ecelp9600,audio/vnd.octel.sbc,audio/vnd.presonus.multitrack,audio/vnd.qcelp,audio/vnd.rhetorex.32kadpcm,audio/vnd.rip,audio/vnd.sealedmedia.softseal-mpeg,audio/vnd.vmx.cvsd,audio/vorbis,audio/vorbis-config,audio/adpcm,audio/amr,audio/amr-wb,audio/atrac-advanced-lossless,audio/atrac-x,audio/atrac3,audio/bv16,audio/bv32,audio/cn,audio/dat12,audio/dv,audio/dvi4,audio/evrc,audio/evrc-qcp,audio/evrc0,audio/evrc1,audio/evrcb,audio/evrcb0,audio/evrcb1,audio/evrcwb,audio/evrcwb0,audio/evrcwb1,audio/g719,audio/g722,audio/g7221,audio/g723,audio/g726-16,audio/g726-24,audio/g726-32,audio/g726-40,audio/g728,audio/g729,audio/g7291,audio/g729d,audio/g729e,audio/gsm,audio/gsm-efr,audio/gsm-hr-08,audio/ilbc,audio/isac,audio/l16,audio/l20,audio/l24,audio/l8,audio/lpc,audio/midi,audio/mp4a-latm,audio/mpa,audio/musepack,audio/parityfec,audio/pcma,audio/pcma-wb,audio/pcmu-wb,audio/pcmu,audio/qcelp,audio/red,audio/s3m,audio/silk,audio/smv,audio/smv0,audio/smv-qcp,audio/uemclip,audio/vdvi,audio/vmr-wb,audio/vnd.4sb,audio/vnd.celp,audio/vnd.sealedmedia.softseal.mpeg,audio/x-aac,audio/x-aiff,audio/x-caf,audio/x-flac,audio/x-matroska,audio/x-mpegurl,audio/x-ms-wax,audio/x-pn-realaudio,audio/x-pn-realaudio-plugin,audio/x-tta,audio/x-wav,audio/xm,audio/aiff,audio/x-au,audio/make,audio/x-gsm,audio/it,audio/x-jam,audio/nspaudio,audio/x-nspaudio,audio/x-liveaudio,audio/x-mpequrl,audio/x-mid,audio/x-midi,audio/x-vnd.audioexplosion.mjuicemediafile,audio/mod,audio/x-mod,audio/x-mpeg-3,application/x-vnd.audioexplosion.mzz,audio/make.my.funk,audio/x-realaudio,audio/mid,audio/x-psid,audio/x-adpcm,audio/tsp-audio,audio/tsplayer,audio/voc,audio/x-voc,audio/voxware,audio/x-twinvq-plugin,audio/x-twinvq';

// Hard coding those is fine. As long as we don't put api secret here!!!
const APP_ID = '457131676170';
const API_KEY = 'AIzaSyAYXOVFtKSsuHB0xSBFklbNpn5Fna5Vycs';
const CLIENT_ID = '457131676170-6sqjomp8211vm88ts33g1ailrri30886.apps.googleusercontent.com';
const SCOPE = 'profile email https://www.googleapis.com/auth/blogger https://www.googleapis.com/auth/drive.readonly';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSignedIn: false,

      existingLabels: undefined,
      selectedBlog: undefined,
      postsCount: undefined,

      nextPageToken: undefined,
      posts: undefined,
    };
  }

  componentDidMount() {
    window.gapi.load('client:auth2:blogger:picker', this.initClient);

    if (!(location.hostname === "localhost" || location.hostname === "127.0.0.1")) {
      if (location.protocol !== "http:") {
        location = `https://${location.host}/`;
      }
    }
  }

  initClient = () => {
    window.gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      scope: SCOPE,
    }).then(() => {
      // Listen for sign-in state changes.
      window.gapi.auth2.getAuthInstance().isSignedIn.listen(
        (isSignedIn) => this.updateSigninStatus(isSignedIn)
      );
      // Handle the initial sign-in state.
      this.updateSigninStatus(window.gapi.auth2.getAuthInstance().isSignedIn.get());
    });
  };

  updateSigninStatus = (isSignedIn) => {
    this.setState({
      isSignedIn: isSignedIn
    });

    if (isSignedIn) {
      this.makeApiCall();
    }
  };

  signIn = (event) => {
    window.gapi.auth2.getAuthInstance().signIn();
  };

  signOut = (event) => {
    window.gapi.auth2.getAuthInstance().signOut();
  };

  loadPostsInitial = async (statuses = ['live', 'scheduled', 'draft']) => {
    try {
      const myBlog = await Blogs.getMyFirstBlog();      
      
      const myPosts = await Posts.list(myBlog.id, statuses);
      this.setState({
        selectedBlog: myBlog,
        postsCount: myBlog.posts.totalItems,

        nextPageToken: myPosts.nextPageToken,
        posts: myPosts.items,
      });
      return { myBlog, myPosts };
    } catch (e) {
      // Ignore this error on logout
      if(this.state.isSignedIn) {
        alert(`There has been an error while loading posts of your blog! \n\nTry to refresh the page or log out and log back in. \n\nError message: ${e.message}`);
      }
      
      return {};
    }
  };

  loadPostsNext = async (statuses = ['live', 'scheduled', 'draft']) => {
    if (this.state.selectedBlog && this.state.nextPageToken) {
      try {
        const nextPosts = await Posts.list(this.state.selectedBlog.id, statuses, this.state.nextPageToken);
        this.setState({
          nextPageToken: nextPosts.nextPageToken,
          posts: [...this.state.posts, ...nextPosts.items],
        });
      } catch (e) {
        alert(`There has been an error while loading more blogs posts! \n\nTry to refresh the page or log out and log back in. \n\nError message: ${e.message}`);
      }
    } else {
      // For the case if initial load failed
      return this.loadPostsInitial(statuses);
    }
  };

  makeApiCall = async () => {
    // // Make an API call to the People API, and print the user's given name.
    // var request = window.gapi.client.request({
    //     'path': '/drive/v2/files?q=trashed=false ' +
    //             'and ( '+
    //               'mimeType contains "application/rtf" or ' +
    //               'mimeType contains "application/pdf" or ' +
    //               'mimeType contains "application/vnd.openxmlformats-officedocument.wordprocessingml.document" or ' +
    //               'mimeType contains "application/msword" ' +
    //             ')',
    //     'method': 'GET',
    //     'params': {'maxResults': '50'}
    //     });

    // request.execute((resp) => {  
    //   console.log('resp',resp);
    // });

    const GoogleAuth = window.gapi.auth2.getAuthInstance();
    const GoogleUser = GoogleAuth.currentUser.get();
    const authResponse = GoogleUser.getAuthResponse(true);
    const { access_token } = authResponse;
    console.log('GoogleAuth', GoogleAuth);
    console.log('GoogleUser', GoogleUser);
    console.log('authResponse', authResponse);
    console.log('access_token', access_token);


    var view = new window.google.picker.View(window.google.picker.ViewId.DOCS_IMAGES_AND_VIDEOS);
    view.setMimeTypes(ALL_AUDIO_MIME_TYPES);
    var picker = new window.google.picker.PickerBuilder()
        .enableFeature(window.google.picker.Feature.NAV_HIDDEN)
        .enableFeature(window.google.picker.Feature.MULTISELECT_ENABLED)
        .setAppId(APP_ID)
        .setOAuthToken(access_token)
        .addView(view)
        .addView(new window.google.picker.DocsUploadView())
        .setDeveloperKey(API_KEY)
        .setCallback((data) => {
          if (data.action === 'picked') {
            document.write(`<iframe src="${data.docs[0].embedUrl}" width="640" height="480"></iframe>`)
          }
        })
        .build();
     picker.setVisible(true);

    const { myBlog, myPosts } = await this.loadPostsInitial();
    console.log('myBlog.id', myBlog.id);

    console.log('myBlog',myBlog);

    try {
      const response = await fetchJsonp(`${myBlog.url}feeds/posts/summary?alt=json&max-results=0&callback=cat`, { jsonpCallbackFunction: 'cat' });
      const data = await response.json();
      const existingLabels = data.feed.category.map((category) => category.term);
      this.setState({
        existingLabels,
      })
    } catch (e) {
      alert(`There has been an error while loading labels! \n\nTry to refresh the page or log out and log back in. \n\nError message: ${e.message}`);      
    }


    // -------- IVAN COPY-PASTE THIS -------- 
    let myFirstPost;
    try {
      myFirstPost = await Posts.get(myBlog.id, myPosts.items[0].id);
      console.log('my post #1', myFirstPost);
    } catch (e) {
      console.log('e',e)
      alert(`There has been an error while loading a post on your blog! \n\nTry to refresh the page or log out and log back in. \n\nError message: ${e.message}`);
    }
    // --------------------------------------


    // -------- IVAN COPY-PASTE THIS -------- 
    try {
      const currentMoment1 = moment()
      const updatedPost = await Posts.updateAndPossiblyRevertToDraft(
        myBlog.id, 
        { ...myFirstPost, title: `Random title ${Math.random()}`, updated: currentMoment1.toISOString()}, 
        Math.round(Math.random())
      );

      console.log('my post #1 updated', updatedPost);      
    } catch (e) {
      console.log('e',e)
      alert(`There has been an error while submitting your blog post! \n\nTry again or log out and log back in. \n\nError message: ${e.message}`);
    }
    // --------------------------------------




    // -------- IVAN COPY-PASTE THIS -------- 
    try {
      const deletedPost = await Posts.delete(myBlog.id, myFirstPost.id);
      console.log('deletedPost', deletedPost);
    } catch (e) {
      console.log('e',e)
      alert(`There has been an error while deleting blog post! \n\nTry again or log out and log back in. \n\nError message: ${e.message}`);
    }
    // --------------------------------------
  };

  schedulePost = () => {
    console.log('scheudle pressed! !');
  }

  render() {
    return this.state.isSignedIn ? (
      <Navigation onLogoutClick={this.signOut} selectedBlog={this.state.selectedBlog} posts={this.state.posts} postsCount={this.state.postsCount} existingLabels={this.state.existingLabels} loadPostsNext={() => this.loadPostsNext()} schedulePost={this.schedulePost}/>
    ) : (
      <FirstLogin onSignInClick={this.signIn} />
    )
  }
}

export default App;
