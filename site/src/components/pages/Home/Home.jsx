/*
 * Author: Jay Mark
 * Email: jay.mj@alibaba-inc.com
 * Website: http://majie.co
 */

import React from "react";
import EnchancedComponent from "common/EnchancedComponent";
import HeaderMenu from 'mod/Header';
import styles from "./Home.less";

export default class Component extends EnchancedComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    	<div className={styles.container}>
	        <HeaderMenu selected="home"/>
          <div className={styles.wrapper}>
            <div className={styles.logoTitle}>CY3D</div>
            <div className={styles.logoSubTitle}>基于Three.js的3D图表组件库</div>
            <div className={styles.canvasWrapper}>
              <canvas id="mainCanvas"/>
            </div>
          </div>
    	</div>
    );
  }



  updateCanvas () {
    var WINDOW_WIDTH = document.body.clientWidth;
    var WINDOW_HEIGHT = document.body.clientHeight - 64;
    var rains = [];

    function updateRain(context){

      var x = 100;
      var y = 0;
      var R = 0;
      var border = 0;//0-1
      var arpha = 1;
      // setInterval(function(){
      //  addRains();
      // },300);
      for(var i=0;i<50;i++){
        addRains();
      }
      setInterval(function(){
        context.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
        context.beginPath();
        context.fillStyle = 'rgb(16,142,233)';
        context.fillRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
        rain(context);
      },16)
    }

    //绘制雨滴
    function rain(context){
      for(var i = 0;i<rains.length;i++){
        var _y = rains[i].y;
        var r = 2;
        var arpha = 1
        for(var j = 0;j<50;j++){
          if(_y<=rains[i].surface){
            context.beginPath();
            context.arc(rains[i].x , _y , r , 0 , Math.PI*2 , true);
            context.fillStyle = 'rgba(0255,255,255,'+arpha+')';
            context.fill();
            context.closePath();
          }
          _y -= r*1.5;
          r -= 0.04;
          arpha -= 0.02;
        }
        if(rains[i].y>rains[i].surface){
          if(rains[i].waveHr<=1){
            wave(context,i);
            rains[i].waveR += 0.5;
            rains[i].waveHr += 0.005;
            if(rains[i].waveArpha<=0.5){
              rains[i].waveArpha = 0.5
            }else{
              rains[i].waveArpha -= 0.001;
            }
          }else{
            // rains.splice(i,1);
            rains[i] = {
              x:parseInt(Math.random()*WINDOW_WIDTH),
              y:-parseInt(Math.random()*500),
              v:parseInt(Math.random()*6+4),
              rainR:2,
              rainArpha:1,
              waveHr:0,
              waveArpha:1,
              waveR:1,
              surface:WINDOW_HEIGHT - parseInt(50+Math.random()*100)
            }
          }
        }
        rains[i].y += rains[i].v;
      }
    }
    //绘制波纹
    function wave(context,num){
      context.save();
      context.scale(1,0.5);
      context.beginPath();
      var g = context.createRadialGradient(rains[num].x , (rains[num].surface)*2 , 0 , rains[num].x ,(rains[num].surface)*2,rains[num].waveR);
      g.addColorStop(0,'rgba(255,255,255,0)');
      g.addColorStop(rains[num].waveHr,'rgba(255,255,255,0)');
      g.addColorStop(1,'rgba(255,255,255,'+rains[num].waveArpha+')');
      context.fillStyle = g;
      context.arc(rains[num].x,(rains[num].surface)*2,rains[num].waveR,0,Math.PI*2);
      context.fill();
      context.closePath();
      context.restore();
    }

    function addRains(){
      let aRain = {
        x:parseInt(Math.random()*WINDOW_WIDTH),
        y:-parseInt(Math.random()*1000),
        v:parseInt(Math.random()*6+4),
        rainR:2,
        rainArpha:1,
        waveHr:0,
        waveArpha:1,
        waveR:1,
        surface:WINDOW_HEIGHT - parseInt(50+Math.random()*100)
      }
      rains.push(aRain);
    }

    var canvas = document.getElementById('mainCanvas');
    var context = canvas.getContext('2d');
    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;
    context.beginPath();
    context.fillStyle = 'rgb(16,142,233)';
    context.fillRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
    context.closePath();
    updateRain(context);
  }

  componentDidMount() {
    this.updateCanvas();
    // window.onresize = () => {
    //   this.updateCanvas();
    // };
  }

  componentWillUnmount() {}
}
