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
    addToLocalStorage(id)
  }
  render() {
    const {url, text, id} = this.props;
    return <a href={url} onClick={this.handleClick} data-id={id}>{text}</a>;
  }
}

class RecentlyUsed extends React.Component {
  render() {
    let currentList = getLocalStorage();
    return (
      <div className="group">
        <h2>Recently Clicked</h2>
        {currentList.reverse().map(function (text) {
          const url = `http://tddbin.com/#?kata=es6/language/${text}`;
          return <KataLink url={url} text={text} id={text} />
        })}
      </div>
    );
  }
}

function getLocalStorage () {
  let ls = localStorage.getItem('recent');
  return ls ? ls.split(',') : [];
}

function addToLocalStorage (id) {
  let currentList = getLocalStorage();
  currentList = currentList.filter(function (value) {
    return value !== id;
  });
  currentList.push(id);
  localStorage.setItem('recent', currentList);
}