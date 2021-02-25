<template>
  <div id="app">
    <div class="header">
      <i @click="isShowMenu=true" class="icon-menu"></i>
      <h1>GitHub Ranking</h1>
    </div>
    <div class="content">
      <i v-show="isLoading" class="icon-loading"></i>
      <div v-for="(item, index) of infos" v-show="!isLoading" class="item">
        <div class="name">
          <a :href="item ? item.link : 'https://microzz.com/'" target="_blank">{{ item ? item.title : '' }}</a>
        </div>
        <div class="desc">
          {{ item ? item.desc : '' }}
        </div>
        <div class="infos">
          <div class="lang">
            <span :class="[lang.replace('\#', '')]"></span>{{lang}}
          </div>
        </div>
        <div class="update">
          {{ item ? item.updateDate : ''}}
        </div>
      </div>
    </div>
    <transition name='fadeIn'>
      <div class='menu' v-if="isShowMenu">
        <div class="aside">
          <div class="aside-title">
            <h2>Languages</h2>
          </div>
          <div class="aside-content">
            <div @click="search(item, index)" v-for="(item, index) of langs" :class="{current: index===currentIndex}" class="lang-name">{{ item }}</div>
            <div class='pos'></div>
          </div>
        </div>
        <div @click="isShowMenu=false" class="mask"></div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      infos: [],
      isShowMenu: false,
      langs: ['JavaScript', 'HTML', 'CSS', 'PHP', 'Java', 'Ruby', 'CoffeeScript', 'Python', 'TypeScript', 'C#'],
      isLoading: false,
      lang: 'JavaScript',
      currentIndex: '',
    }
  },
  methods: {
    getData(lang='JavaScript', sort='stars') {
      this.axios.get(`/github-ranking/${lang.replace('#', '%23')}/${sort}`)
        .then(result => result.data)
        .then(data => {
          Object.keys(data).forEach(item => {
            data[item].forEach((val, index) => {
              if (!this.infos[index]) {
                this.infos[index] = {};
              }
              this.infos[index][item.replace(/s$/, '')] = val;
            })
          })
          this.isLoading = false;
        })
    },
    search(lang, index) {
      this.currentIndex = index;
      this.lang = lang;
      this.getData(lang);
      this.isShowMenu = false;
      this.isLoading = true;
    }
  }
}
</script>

<style lang='scss'>
@import "./assets/style/base.scss";
#app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  .menu {
    position: absolute;
    display: flex;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    .aside {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 200px;
      height: 100%;
      box-shadow: 1px 0 20px gray;
      background-color: white;
      .aside-title {
        flex: 1;
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
        background-color: #2196F3;
        color: white;
        h2 {
          letter-spacing: 2px;
        }
      }
      .aside-content {
        width: 100%;
        flex: 10;
        display: flex;
        flex-direction: column;
        align-items: center;
        letter-spacing: 2px;
        text-align: center;
        .current {
          color: #FF6E40;
        }
        .lang-name {
          flex: 1;
          display: flex;
          padding-left: 20%;
          align-items: center;
          width: 100%;
          border-bottom: 1px solid rgba(0, 0, 0, .1);
          cursor: pointer;

        }
        .lang-name:hover {
          background-color: #FFF8E1;
        }
        .pos {
          flex: 3;
        }
      }
    }
    .mask {
      flex: 1;
      height: 100%;
    }
  }
  .header {
    position: relative;
    flex: 1;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #2196F3;
    color: white;
    border-bottom: 1px solid rgba(0, 0, 0, .1);
    h1 {
      transition: .3s;
    }
    h1:hover {
      transform: rotate(6deg);
      transition: .3s;
    }
    i {
      position: absolute;
      display: inline-block;
      width: 30px;
      height: 30px;

    }
    i.icon-menu {
      left: 10px;
      bottom: 12px;
      background: url('./assets/icons/menu.svg') no-repeat;
      background-size: contain;
      cursor: pointer;
    }
  }
  .content {
    position: relative;
    width: 100%;
    height: 100%;
    flex: 10;
    overflow: auto;
    text-align: center;
    .icon-loading {
      display: inline-block;
      width: 35px;
      height: 35px;
      margin-top: 8px;
      background: url('./assets/icons/loading.svg') no-repeat;
      background-size: contain;
      animation: loading .6s linear infinite;
    }
    .item:hover {
      background-color: #FAFAFA;
    }

    .item {
      width: 100%;
      padding: 5px 10px;
      text-align: left;
      .name {
        font-size: 120%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-weight: bold;
      }
      .desc {
        padding-top: 2px;
      }
      .infos {
        display: flex;
        padding: 3px;
        .lang {
          padding-left: 10px;
          letter-spacing: 1px;
          flex: 3;
          span {
            display: inline-block;
            width: 12px;
            height: 12px;
            border-radius: 6px;
            background-color: #f1e05a;
            margin-right: 3px;
          }
          .C {
            background-color: #178600;
          }
          .TypeScript {
            background-color: #2b7489;
          }
          .Python {
            background-color: #3572A5;
          }
          .CoffeScript {
            background-color: #244776;
          }
          .Ruby {
            background-color: #701516;
          }
          .Java {
            background-color: #b07219;
          }
          .PHP {
            background-color: #4F5D95;
          }
          .CSS {
            background-color: #563d7c;
          }
          .HTML {
            background-color: #e34c26;
          }
        }
        .star {
          flex: 1;
          height: 16px;
          .octicon {
            vertical-align: -2px;
            margin-right: 3px;

          }
        }
      }
      .update {
        color: gray;
        font-size: 90%;
      }
    }
    .item + .item {
      border-top: 1px solid rgba(0, 0, 0, .1);
    }
  }
}

.fadeIn-enter-active {
  transition: all .4s ease;
}
.fadeIn-leave-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.fadeIn-enter, .fadeIn-leave-active {
  transform: translateX(-250px);
  opacity: 0;
}
@keyframes loading {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
