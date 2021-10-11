import { render, screen, fireEvent } from '@testing-library/react';
import App from './App'; 
import {fetchData} from './functions/fetchData'; 

/*
What to test?
1. Loading on display = done!
2. That data and list are not null
3. When I enter into the Search Harry Potter = Harry Potter is on display
4. When I enter into the Search House Gryffindor = Gryffindor is on display

*/


test('see if fetchData is not full', async ()=> {
  expect.assertions(1);
  let dataUploaded = await fetchData();
  expect(dataUploaded).toBeDefined();
}); 

test('Loading is on display', () => {
  render(<App />);
  const linkElement = screen.getByText(/Loading/i);
  expect(linkElement).toBeInTheDocument();
});


test('Search is on display, render is completed', async () => {
  render(<App />);
  const loadingText = await screen.findByText(/Search/i);
  expect(loadingText).toBeInTheDocument();
});


test('input Harry Potter, and Harry Potter is on display', async () => {
  render(<App />);
  let data = await fetchData();

  if(data){
    
    const {queryByTitle} = render(<App />);
    const input1 = queryByTitle("input1");
    expect(input1).toBeDefined();


    fireEvent.change(input1, {target: {value: 'harry'}});
    let harryPotter = screen.getByText('Name: Harry Potter');
    expect(input1.value).toEqual('harry');
    expect(harryPotter).toBeInTheDocument();

    
    console.log('END OF TEST');

  }
});

test('input house Gryffindor, and Gryffindor is on display', async () => {
  render(<App />);
  let data = await fetchData();

  if(data){
    
    const {queryByTitle} = render(<App />);
    const input1 = queryByTitle("input1");
    expect(input1).toBeDefined();

    fireEvent.change(input1, {target: {value: 'Gryffindor'}});
    expect(input1.value).toEqual('Gryffindor');
    let houseGryffindor = screen.findAllByText('House: Gryffindor');
    expect(houseGryffindor).toBeDefined();
      
  }
});





