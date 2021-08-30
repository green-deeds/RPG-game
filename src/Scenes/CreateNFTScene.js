/* eslint-disable no-undef */
import 'phaser';
import config from '../Config/config';

export default class LeaderBoardScene extends Phaser.Scene {
  constructor() {
    super('CreateNFT');
  }

  init() {
    this.scale.fullscreenTarget = document.getElementById(config.parent);
  }



  create() {
    this.back = this.add.image(400, 300, 'background');
    this.add.image(400, 100, 'title');

    this.add.text(400, 200, 'Your Tree', {
      color: 'white',
      fontSize: '32px ',
      fontFamily: 'Georgia',
    }).setOrigin(0.5, 0.5);

    const userAction = async () => {
      const response = await fetch('http://localhost:5000/create_nft', {
        method: 'POST',
        // body: {}, // string or object
        // headers: {
        //   'Content-Type': 'application/json'
        // }
      });
      const nftree = await response.json(); //extract JSON from the http response
      console.log("nftree", nftree)
    }


    const style = 'background: url(assets/ui/button_small.png); width: 490px; height: 77px; border: none; font: 32px Georgia; color: #fff;';
    const btn_create_nft = this.add.dom(390, 300, 'button', style, 'Create NFT');
    btn_create_nft.addListener('click');
    const btn = this.add.dom(390, 490, 'button', style, 'Menu');
    btn.addListener('click');

    btn.on('click', () => {
      this.model = this.sys.game.globals.model;
      this.model.score = 0;
      this.scene.start('Title');
    });
    btn_create_nft.on('click', () => {

      userAction().then(() => {
        this.add.text(400, 350, 'Success', {
          color: 'white',
          fontSize: '32px ',
          fontFamily: 'Georgia',
        }).setOrigin(0.5, 0.5);
      }).catch(err => {
        console.error(err);
        this.add.text(400, 350, 'Error', {
          color: 'white',
          fontSize: '32px ',
          fontFamily: 'Georgia',
        }).setOrigin(0.5, 0.5);
      })

      
    });
  }
}
