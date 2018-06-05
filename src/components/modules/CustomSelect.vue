<template>
  <select :id="id">
     <option v-for="elem in data" :value="elem.value">
       {{elem.label}}
     </option>
 </select>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: () => Math.random().toString(36).substring(7)
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  mounted: function() {
    const vm = this;
    $(`#${this.id}`).each(function(){
      var $this = $(this), numberOfOptions = $(this).children('option').length;

      $this.addClass('select-hidden');
      $this.wrap('<div class="select"></div>');
      $this.after('<div class="select-styled"></div>');

      var $styledSelect = $this.next('div.select-styled');
      $styledSelect.text($this.children('option').eq(0).text());

      var $list = $('<ul />', {
          'class': 'select-options'
      }).insertAfter($styledSelect);

      for (var i = 0; i < numberOfOptions; i++) {
          $('<li />', {
              text: $this.children('option').eq(i).text(),
              rel: $this.children('option').eq(i).val()
          }).appendTo($list);
      }

      var $listItems = $list.children('li');

      $styledSelect.click(function(e) {
          e.stopPropagation();
          $('div.select-styled.active').not(this).each(function(){
              $(this).removeClass('active').next('ul.select-options').hide();
          });
          $(this).toggleClass('active').next('ul.select-options').toggle();
      });

      $listItems.click(function(e) {
          e.stopPropagation();
          $styledSelect.text($(this).text()).removeClass('active');
          $this.val($(this).attr('rel'));
          $list.hide();
          // HERE EMITS THE SELECTED
          vm.$emit('onSelect', $this.val());
      });

      $(document).click(function() {
          $styledSelect.removeClass('active');
          $list.hide();
      });
    });
  }
}
</script>
