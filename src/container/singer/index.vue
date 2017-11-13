<template lang="pug">
div
  div.singer-container#singer-container
    mt-index-list(ref="mt-index-list")
      mt-index-section.singer-list(
        v-for="(item, index) of list" 
        :index="item[0].title" 
        :key="item.index"
      )
        router-link.singer-list-item(
          v-for="(child, index) of item"
          tag="div"
          :to="'/singer/'+child.id"
          :key="item.id"
        )
          div.img
            img(v-lazy="child.imgUrl")
          p.title {{child.name}}
  router-view
</template>

<script>
  import _map from 'lodash/map'
  import _groupBy from 'lodash/groupBy'
  import _filter from 'lodash/filter'
  import _values from 'lodash/values'
  import _sortBy from 'lodash/sortBy'
  import _take from 'lodash/take'
  import { getSingerList } from '@/api'
  import { playListMixin } from '@/mixins'
  import { size } from '@/config'
  import { singer } from '@/utils'

  const { newSinger } = singer
  const singerDataFormat = (data) => {
    let list = _filter(_map(data, newSinger), (item) => !!item.title.match(/[a-zA-Z]/))
    let listGroup = _groupBy(list, 'title')
    listGroup = _values(listGroup)
    listGroup = _sortBy(listGroup, (item) => item[0].title)
    const hot = _map(_take(list, 10), (item) => ({
      ...item,
      title: 'hot'
    }))
    listGroup = [hot].concat(listGroup)
    return listGroup
  }

  export default {
    mixins: [playListMixin],
    name: 'singer',
    data(){
      return {
        list: {}
      }
    },
    methods: {
      async getSingerList(){
        const { data, success } = await getSingerList()
        if (success){
          const { list } = data
          this.list = singerDataFormat(list)
        }
      },
      playListChange(playList){
        const h = window.innerHeight - size.appTabHeight - (playList.length === 0 ? 0 : size.miniPlayerHeight)
        this.$refs['mt-index-list'].$el.querySelector('.mint-indexlist-content').style.height = h + 'px'
      }
    },
    created(){
      this.getSingerList()
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../static/stylus/index.styl'
  .singer-list-item
    padding: $spacing
    display: flex
    align-items: center
    position: relative
    &:not(:nth-last-child(1)):before
      sethalfborderbottom()
    .img,
    .img img
      width: 60px
      height: 60px
      border-radius: 50%
    .img
      margin-right: $spacing
    .title
      font-size: $fontSize
      line-height: 1.5
      color: #666
</style>
