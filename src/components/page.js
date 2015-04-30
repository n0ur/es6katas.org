import React from 'react';

export default class Page extends React.Component {

  render() {
    let {kataGroups} = this.props;
    const numKatas = kataGroups.reduce((old, {kataLinks: {length}}) => old + length, 0);
    return (
      <body>
        <h1>ES6 Katas</h1>
        <p>Just learn a bit of ES6 daily, take one kata a day and fix it away.</p>
        <RecentlyUsed />
        <KataGroups groups={kataGroups} />
        <footer>
          by <a href="http://uxebu.com">uxebu</a> --- 
          using <a href="http://tddbin.com">tddbin</a> ---  
          on <a href="http://github.com/tddbin/es6katas.org">github</a> ---  
          {numKatas} katas --- 
          follow <a href="https://twitter.com/es6katas">@es6katas</a>
        </footer>
        <script src="./index.min.js" type="application/javascript"></script>
      </body>
    );
  }
}

class KataGroups extends React.Component {
  render() {
    const {groups} = this.props;
    return (
      <div>
        {groups.map((group) => <KataGroup group={group} key={group.name}/>)}
      </div>
    );
  }
}

class KataGroup extends React.Component {
  render() {
    const name = this.props.group.name;
    const kataLinks = this.props.group.kataLinks;
    return (
      <div className="group">
        <h2>{name}</h2>
        {kataLinks.map((link) => <KataLink {...link} key={link.text}/>)}
      </div>
    );
  }
}

class KataLink extends React.Component {
  handleClick(e) {
    const id = e.currentTarget.dataset.id;
    let currentListStr = sessionStorage.getItem('recent');

    let currentList;
    if (currentListStr) {
      currentList = currentListStr.split(',');
    } else {
      currentList = [];
    }

    currentList = currentList.filter(function(value) {
      return value !== id;
    });
    currentList.push(id);
    sessionStorage.setItem('recent', currentList);
  }
  render() {
    const {url, text} = this.props;
    return <a href={url} onClick={this.handleClick} data-id={text}>{text}</a>;
  }
}

class RecentlyUsed extends React.Component {
  render() {
    // for (sessionStorage.length)

    // Object.keys(sessionStorage).forEach(function(key) {
      // console.log(key, obj[key]);
    // });
    return (
      // <KataGroup group={group} key="Recently Used"/>
      <div className="group">
        <h2>Recently Used</h2>
      </div>
    );
  }
}