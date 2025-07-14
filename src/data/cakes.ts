/* const cakes = [
  { name: 'Black Forest Cake', image: 'cakes/cake1.png', priceHalf: 350, priceOne: 650 },
  { name: 'White Forest Cake', image: 'cakes/cake2.png', priceHalf: 350, priceOne: 650 },
  { name: 'Red Velvet Cake', image: 'cakes/cake3.png', priceHalf: 400, priceOne: 850 },
  { name: 'Choco Truffle Cake', image: 'cakes/cake4.png', priceHalf: 450, priceOne: 1000 },
];

export default cakes;
 */
// 🎂 Define the Cake type and export cake data
export interface Cake {
  name: string;
  image: string;
  priceHalf: number;
  priceOne: number;
}

const cakes: Cake[] = [
  { name: 'Black Forest Cake', image: 'cakes/cake1.png', priceHalf: 350, priceOne: 650 },
  { name: 'White Forest Cake', image: 'cakes/cake2.png', priceHalf: 350, priceOne: 650 },
  { name: 'Red Velvet Cake', image: 'cakes/cake3.png', priceHalf: 400, priceOne: 850 },
  { name: 'Choco Truffle Cake', image: 'cakes/cake4.png', priceHalf: 450, priceOne: 1000 },
];
export default cakes;
