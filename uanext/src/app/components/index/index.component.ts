import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserRole } from 'src/app/models';
import { AuthService } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { AuthorizationService } from 'src/app/services/http/authorization.service';


declare const slidePage;

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, AfterViewInit, OnDestroy {
  slide: any;
  canScrollUp = false;
  canScrollDown = true;
  self = 'IndexComponent';
  currentPage = 1;

  animationInterval_1: any;
  animationInterval_2: any;
  timeOut1: any;
  timeOut2: any;

  slidePageDelay = 900; // wait for slidePage

  constructor(private socialAuthService: AuthService, private authService: AuthorizationService) { }

  ngOnInit() {
    this.authService.userRole = undefined;
  }

  ngAfterViewInit() {
    this.init1();
    this.init2();

    this.slide = new slidePage({
      before: (origin, direction, target) => {
        this.currentPage = target;
        this.canScrollDown = true;
        this.canScrollUp = true;

        clearTimeout(this.timeOut1);
        clearTimeout(this.timeOut2);

        requestAnimationFrame(() => {
          this.init1();
          this.init2();
        });

        if (target === 1) {
          this.canScrollUp = false;
        }

        if (target === 2) {
          this.startAnimation1();
          this.startCircleAnimation1();

          this.animationInterval_1 = setInterval(() => {
            this.startAnimation1();
            this.startCircleAnimation1();
          }, 8000 + 2000); // + so that the animation will end
        } else {
          clearInterval(this.animationInterval_1);
        }

        if (target === 3) {
          this.startAnimation2();
          this.startCircleAnimation2();

          this.animationInterval_2 = setInterval(() => {
            this.startAnimation2();
            this.startCircleAnimation2();
          }, 8000 + 2000); // + so that the animation will end
        } else {
          clearInterval(this.animationInterval_2);
        }

        if (target === 5) {
          this.canScrollDown = false;
        }
      }
    });

    window.addEventListener('resize', this.windowResizeHandler);
  }

  startAnimation1() {
    const elements = document.querySelectorAll('.investor-curve-line .animation-element');
    const elements_2 = document.querySelectorAll('.investor-curve-line .block .name-and-text');
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.remove('restart-animation');
      elements_2[i].classList.remove('restart-color-animation');
      setTimeout(() => {
        elements[i].classList.add('restart-animation');
        elements_2[i].classList.add('restart-color-animation');
      }, this.slidePageDelay); // wait slidePage and rewrite class (delay 0 not work)
    }
  }

  startAnimation2() {
    const elements = document.querySelectorAll('.vendor-curve-line .animation-element');
    const elements_2 = document.querySelectorAll('.vendor-curve-line .block .name-and-text');
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.remove('restart-animation');
      elements_2[i].classList.remove('restart-color-animation');
      setTimeout(() => {
        elements[i].classList.add('restart-animation');
        elements_2[i].classList.add('restart-color-animation');
      }, this.slidePageDelay); // wait slidePage and rewrite class (delay 0 not work)
    }
  }

  startCircleAnimation1() {
    this.setMovingCircleDisplay('circle-for-animation-1', 'none');
    const circleAnimation: any = document.getElementById('circle-animation-1');
    circleAnimation.endElement();
    setTimeout(() => {
      this.setMovingCircleDisplay('circle-for-animation-1', 'block');
      const circleAnimation_2: any = document.getElementById('circle-animation-1');
      circleAnimation_2.beginElement();
    }, this.slidePageDelay);
    this.timeOut1 = setTimeout(this.hideCircle1, 8000 + this.slidePageDelay);
  }

  startCircleAnimation2() {
    this.setMovingCircleDisplay('circle-for-animation-2', 'none');
    const circleAnimation: any = document.getElementById('circle-animation-2');
    circleAnimation.endElement();
    setTimeout(() => {
      this.setMovingCircleDisplay('circle-for-animation-2', 'block');
      const circleAnimation_2: any = document.getElementById('circle-animation-2');
      circleAnimation_2.beginElement();
    }, this.slidePageDelay);
    this.timeOut2 = setTimeout(this.hideCircle2, 8000 + this.slidePageDelay);
  }

  hideCircle1 = () => {
    this.setMovingCircleDisplay('circle-for-animation-1', 'none');
  }

  hideCircle2 = () => {
    this.setMovingCircleDisplay('circle-for-animation-2', 'none');
  }

  setMovingCircleDisplay(id, display) {
    const circlesForAnimation = document.querySelectorAll('#' + id);
    for (let i = 0; i < circlesForAnimation.length; i++) {
      circlesForAnimation[i].setAttributeNS(null, 'style', 'display:' + display);
    }
  }

  windowResizeHandler = () => {
    this.init1();
    this.init2();
  }

  slideUp() {
    this.slide.slidePrev();
  }

  slideDown() {
    this.slide.slideNext();
  }

  ngOnDestroy() {
    this.slide.destroy();
    window.removeEventListener('resize', this.windowResizeHandler);
    clearInterval(this.animationInterval_1);
    clearInterval(this.animationInterval_2);
  }

  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  init1() {
    const svg = document.getElementById('svg-id-1');
    const str = 'M 1304 120 C 1365 209 1373 414 1276 524 C 1211 606 1065 423 996 468 C 884 511 970 268 832 273 ' +
      'C 715 273 767 581 659 556 C 443 507 623 429 549 383 C 468 315 324 625 275 601 C 228 592 296 349 174 334 C 89 311 35 520 118 745';
    const strArr = str.split(' ');
    const re = /\d{1,} \d{1,} C|\d{1,} \d{1,}$/gim;
    const arrowData = [
      [1293, 171],
      [1310, 206],
      [1317, 236],
      [1317, 285]
    ];
    const width = 1440;
    const height = 745;
    const box = svg.getBoundingClientRect();
    const svgW = box.right - box.left;
    const svgH = box.bottom - box.top;
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const oldG = document.getElementById('svg-1-g');
    if (oldG != null) {
      oldG.parentElement.removeChild(oldG);
    }

    let newStr = '';
    const scaleX = svgW / width;
    const scaleY = svgH / height;
    const circlesRe = str.match(re);
    const arrowDataScale = [];
    let arrowPath = 'M ';
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttributeNS(null, 'id', 'svg-1-g');
    svg.appendChild(g);

    // for arrow
    for (let i = 0; i < arrowData.length; i++) {
      const x = arrowData[i][0] * scaleX;
      const y = arrowData[i][1] * scaleY;
      arrowDataScale.push([x, y]);
    }
    arrowPath += arrowDataScale[0][0] + ' ';
    arrowPath += arrowDataScale[0][1] + ' C ';
    arrowPath += arrowDataScale[1][0] + ' ';
    arrowPath += arrowDataScale[1][1] + ' ';
    arrowPath += arrowDataScale[2][0] + ' ';
    arrowPath += arrowDataScale[2][1] + ' ';
    arrowPath += arrowDataScale[3][0] + ' ';
    arrowPath += arrowDataScale[3][1];
    arrow.setAttributeNS(null, 'class', 'arrow-path');
    arrow.setAttributeNS(null, 'd', arrowPath);
    g.appendChild(arrow);


    newStr = this.createPathString(strArr, scaleX, scaleY);
    path.setAttributeNS(null, 'id', 'wire-path-1');
    path.setAttributeNS(null, 'd', newStr);
    g.appendChild(path);

    // circles
    for (let i = 0; i < circlesRe.length - 1; i++) {
      const s: any[] = circlesRe[i].split(' ');
      const x = s[0] * scaleX;
      const y = s[1] * scaleY;
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttributeNS(null, 'class', 'circle');
      circle.setAttributeNS(null, 'cx', x.toString());
      circle.setAttributeNS(null, 'cy', y.toString());
      circle.setAttribute('r', '1.2%');
      g.appendChild(circle);
    }

    const circleForAnimation: any = document.getElementById('circle-for-animation-1').cloneNode(true);
    g.appendChild(circleForAnimation);
  }

  init2() {
    const svg = document.getElementById('svg-id-2');
    const str = 'M 118 0 C 144 75 174 135 235 139 C 363 130 110 490 360 451 C ' +
      '570 392 578 498 671 449 C 763 414 782 288 859 332 C 981 383 927 610 1329 237';
    const strArr = str.split(' ');
    const re = /\d{1,} \d{1,} C|\d{1,} \d{1,}$/gim;
    const width = 1440;
    const height = 640;
    const box = svg.getBoundingClientRect();
    const svgW = box.right - box.left;
    const svgH = box.bottom - box.top;
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const oldG = document.getElementById('svg-2-g');
    if (oldG != null) {
      oldG.parentElement.removeChild(oldG);
    }

    let newStr = '';
    const scaleX = svgW / width;
    const scaleY = svgH / height;
    const circlesRe = str.match(re);
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttributeNS(null, 'id', 'svg-2-g');
    svg.appendChild(g);

    newStr = this.createPathString(strArr, scaleX, scaleY);
    path.setAttributeNS(null, 'id', 'wire-path-2');
    path.setAttributeNS(null, 'd', newStr);
    g.appendChild(path);

    // circles
    for (let i = 1; i < circlesRe.length; i++) {
      const s: any[] = circlesRe[i].split(' ');
      const x = s[0] * scaleX;
      const y = s[1] * scaleY;
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttributeNS(null, 'class', 'circle');
      circle.setAttributeNS(null, 'cx', x.toString());
      circle.setAttributeNS(null, 'cy', y.toString());
      circle.setAttribute('r', '1.2%');
      g.appendChild(circle);
    }

    const circleForAnimation: any = document.getElementById('circle-for-animation-2').cloneNode(true);
    g.appendChild(circleForAnimation);
  }

  createPathString(strArr: string[], scaleX: number, scaleY: number): string {
    let itsX = true;
    let itsNumber = false;
    let prevItsX = false;
    let res = '';

    for (let i = 0; i < strArr.length; i++) {
      if (isNaN(parseInt(strArr[i], 10)) === true) {
        itsNumber = false;
        res += strArr[i] + ' ';
      } else {
        itsNumber = true;
        itsX = true;
        if (prevItsX === true) {
          itsX = false;
        }
        if (itsX === true) {
          res += parseInt(strArr[i], 10) * scaleX + ' ';
          prevItsX = true;
        } else {
          res += parseInt(strArr[i], 10) * scaleY + ' ';
          prevItsX = false;
        }
      }
    }
    return res;
  }

}
