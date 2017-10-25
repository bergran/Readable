import localStorage from 'jest-localstorage-mock'
import React from 'react';
import ReactDOM from 'react-dom';
import CategoryItem from '../CategoryItem';
import Input from '../Input'
import { LoadingItem } from '../LoadingItem'
import Nav from '../Nav'
import NavBarContainer from '../NavBarContainer'
import NewItem from '../NewItem'
import TextArea from '../TextArea'


it('renders without crashing category item', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CategoryItem />, div);
});

it('renders without crashing input', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Input
      initialValue=''
      type='text'
      name='test jest'
      placeHolder='this is a placeholder'
    />, div);
});

it('renders without crashing loading item', () => {
    const div = document.createElement('div');
    ReactDOM.render(<LoadingItem />, div);
});

it('renders without crashing loading item', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Nav
      title={'Prueba jest'}
    >
      <NavBarContainer
          title={'NavBarContainer'}
          sections={[
            {title: 'prueba 1', path:'/'},
            {title: 'prueba 2', path:'/'},
            {title: 'prueba 3', path:'/'},
            {title: 'prueba 4', path:'/'},
            {title: 'prueba 5', path:'/'},
            {title: 'prueba 6', path:'/'}
        ]}
      />
    </Nav>, div);
});

it('renders without crash NewItem', () => {
  const div = document.createElement('div')
  ReactDOM.render(<NewItem
    label='Prueba'
    item='post'
    isValid={false}
    initialAuthor={''}
    initialItem={''}
    initialTitle={''}
    onChange={() => ({})}
  />, div)
})

it('renders without crash TextArea', () => {
  const div = document.createElement('div')
  ReactDOM.render(
      <TextArea
        initialValue=''
        name='Test'
        onChange={() => ({})}
        label='Test'
        value=''
        placeholder='this is a placeholder'
      />, div
  )
})