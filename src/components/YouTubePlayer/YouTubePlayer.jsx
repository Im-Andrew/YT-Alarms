import React from 'react';
import PropTypes from 'prop-types';
import style from './YouTubePlayer.scss';
import * as YTP from '../../scripts/youtube_player';


class YouTubePlayer extends React.Component {
  static propTypes = {
    videoPoint: PropTypes.string, // Youtube Video URL(s) - support multiple formats
    playing: PropTypes.bool,
    fullControl: PropTypes.bool,
  };

  static defaultProps = {
    videoPoint: '', // qualified youtube url
    playing: false,
    fullControl: false
  };
  
  state = {
    playerContainer: <div>Loading</div> // the container of the youtube player
  };
  
  videoID = ''; // Flag to determine if a new player is required 
  player = null;  // actual youtube player

  componentDidMount = () => { YTP.loadYouTubeAPI( this.onYoutubeAPIReady ); };
  componentWillUnmount = ()=> { this.player.destroy(); };


  onYoutubeAPIReady = () => {
    // Create a container that will be holding the player
    const containerNode = document.createElement('div');
    const youtubeNode = document.createElement('div');
    containerNode.appendChild(youtubeNode);
    const playerContainer = <div 
      className={style.playerContainer}
      ref={r =>{ if( r !== null ){ r.appendChild(containerNode)}}} 
    />;
    this.setState({
      playerContainer
    });

    // Create the YouTube Player after the API is loaded.
    this.player = new YT.Player(youtubeNode, {
      host: "https://www.youtube.com",
      videoId: this.videoID,
      origin: window.location.origin,
      widget_referrer: window.location.origin,
      playerVars:{
        'enablejsapi': 1,
        'origin': window.location.origin
      },
      events: {
        onReady: ( event ) => {
          const { playing } = this.props;
          if( playing ){
            this.player.playVideo(); 
          }
        },
        onStateChange: (event) =>{ this.updatePlayerState(event.data); }
      }
    });
  }  

  updatePlayerState = ( playerState = -1 ) => {
    const {fullControl, playing} = this.props;
    
    if (fullControl && this.player) {

      if( playerState === -1 ){
        // The YouTube Player API does not 
        // mention getPlayerState having more than one type or not existing
        if( typeof this.player.getPlayerState === 'function' ){
          playerState = this.player.getPlayerState();
        }
      }

      switch ( playerState ) {
        case YT.PlayerState.PAUSED:
        case YT.PlayerState.ENDED:
          if (playing) { this.player.playVideo(); }
          break;
        case YT.PlayerState.PLAYING:
        case YT.PlayerState.BUFFERING:
          if (!playing) { this.player.pauseVideo(); }
          break;
      }
    }
  };

  updateVideo( URL ){
    const params = YTP.getVideoParameters( URL );

    // Update video player only if there is a new video 
    if (params.v !== this.videoID) {
      // Update
      this.videoID = params.v;
      if( this.player && typeof this.player.cueVideoById === "function" ){
        this.player.cueVideoById({
          videoId: params.v,
          startSeconds: (params.t|params.start)  // `t` is when shared, `start` is from embedded links
        });
      }
    }
  }

  render() {
    const { videoPoint } = this.props;
    const { playerContainer } = this.state;

    this.updateVideo( videoPoint );
    this.updatePlayerState();

    return playerContainer;
  }
}

export { YouTubePlayer };
