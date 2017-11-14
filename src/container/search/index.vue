<template lang="pug">
  transition(name="slide")
    div.search-container(ref="page-container")
      searchBar(
        v-model="searchKey"
        placeholder="搜索歌曲、歌手"
        @cancel-click="cancelClick"
      )
      list-view.search-scroll-view(
        :watchs="{searchKey, hotkey, searchHistory}" 
        :totalPage="searchListTotalPage"
        v-if="searchKey"
        @loadMore="loadMore"
      )
        control-item(
          v-for="(item, index) in searchList" 
          :key="item.index"
          :icon="item.icon"
          @click="searchItemClick(item)"
        ) {{item.songname || item.name}}
      scroll-view.search-scroll-view(data="" v-else)
        h3.search-title(v-if="hotkey.length !== 0") 热门搜索 ({{hotkey.length}})
        tag-list(:data="hotkey" @click="tagClick")
        h3.search-title(v-if="searchHistory.length !== 0")
          span 历史记录 ({{searchHistory.length}})
          icon.search-history-clean-btn(name="shanchu" @click="cleanHistory")
        tag-list(:data="searchHistory" @click="tagClick")
      router-view

</template>

<script>
  import _map from 'lodash/map'
  import _take from 'lodash/take'

  import { mapGetters, mapActions } from 'vuex'
  import { MessageBox } from 'mint-ui'
  import { playListMixin } from '@/mixins'
  import vHead from '@/components/icon'
  import icon from '@/components/icon.vue'
  import scrollView from '@/components/scroll-view.vue'
  import listView from '@/components/list-view.vue'
  import searchBar from '@/components/search-bar.vue'
  import tagList from '@/components/tag-list.vue'
  import controlItem from '@/components/control-item.vue'
  import { getHotKey, search } from '@/api'
  import { song, singer } from '@/utils'
  const { newSong } = song
  const { newSinger } = singer

  const PAGE_COUNT = 40
  const songFormater = (data) => _map(data, (item) => {
    return {
      ...newSong(item),
      type: 'song',
      icon: 'icon-'
    }
  })
  const singerFormater = (item) => {
    return {
      ...newSinger({
        Fsinger_mid: item.singermid,
        Fsinger_name: item.singername
      }),
      type: 'singer',
      icon: 'icon-11'
    }
  }

  export default {
    name: 'search',
    mixins: [playListMixin],
    components: {
      vHead,
      icon,
      scrollView,
      searchBar,
      tagList,
      controlItem,
      listView
    },
    data(){
      return {
        searchKey: '',
        hotkey: [],
        searchList: [],
        searchListTotalPage: 0
      }
    },
    computed: {
      ...mapGetters([
        'searchHistory'
      ])
    },
    methods: {
      cancelClick(){
        this.$router.go(-1)
      },
      tagClick({ text }, index){
        this.searchKey = text
      },
      searchItemClick(item){
        const { type } = item
        this.addSearchHistory({
          text: this.searchKey
        })
        if (type === 'song'){
          console.log(type)
          this.addPlayList({
            list: [item],
            index: 0
          })
        } else {
          this.$router.push('search/singer/' + item.id)
        }
      },
      async _getHotKey(){
        const {data, success} = await getHotKey()
        if (success){
          const { hotkey } = data
          const takeHotKey = _take(hotkey, 10)
          const parseHotkey = _map(takeHotKey, ({k, n}) => ({
            text: k,
            value: n
          }))
          this.hotkey = parseHotkey
        }
      },
      async _search(query, pageIndex){
        const { success, data } = await search(query, pageIndex, true, PAGE_COUNT)
        if (success){
          let { song, zhida } = data
          this.searchListTotalPage = Math.ceil(song.totalnum / PAGE_COUNT)
          song.list = songFormater(song.list)
          console.log(pageIndex, pageIndex === 1)
          if (zhida.type === 2 && pageIndex === 1){
            song.list = [singerFormater(zhida)].concat(song.list)
          }
          this.searchList = this.searchList.concat(song.list)
        }
        return Promise.resolve()
      },
      cleanHistory(){
        MessageBox.confirm('确认要清除历史记录？')
          .then(action => {
            this.removeSearchHistory()
          })
          .catch(e => console.log('不清除'))
      },
      playListChange(){
        this.setOffsetBottom(this.$refs['page-container'])
      },
      async loadMore(pageIndex, done){
        this.searchKey && await this._search(this.searchKey, pageIndex, true)
        done()
      },
      ...mapActions([
        'getSearchHistory',
        'addSearchHistory',
        'removeSearchHistory',
        'addPlayList'
      ])
    },
    created(){
      this._getHotKey()
      this.getSearchHistory()
      this._search()
    },
    watch: {
      searchKey(newKey){
        this.searchList = []
        newKey && this._search(newKey, true)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../static/stylus/index.styl'
  .search-container
    fixed-page()
    z-index: 1
    .search-scroll-view
      top: 40px
  .search-title
    font-size: $fontSize
    line-height: 1.5
    padding: $spacing $spacing 0
    color: #333
    display: flex
    justify-content: space-between
    align-items: center
  .search-history-clean-btn
    width: 20px
    height: 20px
</style>
