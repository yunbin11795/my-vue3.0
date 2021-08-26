import { expect } from 'chai'
import { shallowMount ,mount} from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'


describe('HelloWorld.vue', () => {

  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(HelloWorld, {
      props: { msg }
    });
    expect(wrapper.text()).to.include(msg)
  });


  it('to click button',async ()=>{
    const wrapper = mount(HelloWorld);
    await wrapper.find('button').trigger('click');

    expect(wrapper.vm.number).equal(1)
  })

});


