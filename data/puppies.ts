export interface Puppy {
  slug: string;
  name: string;
  breed: string;
  gender: 'Boy' | 'Girl' | 'Boy & Girl';
  age: string;
  location: string;
  status: 'available' | 'gone_home';
  images: string[];
  hasVideo: boolean;
  description: string;
}

export const PUPPIES: Puppy[] = [
  {
    "slug": "maltipoo-max-male",
    "name": "Max",
    "breed": "Miniature Puppy",
    "gender": "Boy",
    "age": "2-3 months",
    "location": "Imported for you",
    "status": "available",
    "images": [
      "/images/b942a5_4b8cfb8204d24eadaf524332aba1dc15-mv2.webp"
    ],
    "hasVideo": false,
    "description": "Healthy, certified teacup Max (Boy) at TeddyPups U.A.E. Dubai showroom. Microchipped, vaccinated, with international vet passport."
  },
  {
    "slug": "korean-teacup-maltipoo-female",
    "name": "Korean Teacup Maltipoo",
    "breed": "Korean Teacup Maltipoo",
    "gender": "Girl",
    "age": "2-3 months",
    "location": "Imported for you",
    "status": "available",
    "images": [
      "/images/b942a5_50f0ae67c9ff437d911597d52a9e63b3-mv2.jpg"
    ],
    "hasVideo": false,
    "description": "Healthy, certified teacup Korean Teacup Maltipoo (Girl) at TeddyPups U.A.E. Dubai showroom. Microchipped, vaccinated, with international vet passport."
  },
  {
    "slug": "korean-teacup-poodle-female",
    "name": "Korean Teacup Poodle",
    "breed": "Korean Teacup Poodle",
    "gender": "Girl",
    "age": "2-3 months",
    "location": "Imported for you",
    "status": "available",
    "images": [
      "/images/b942a5_14376a216177484dbbb27995d0f6aeb7-mv2.jpg"
    ],
    "hasVideo": false,
    "description": "Healthy, certified teacup Korean Teacup Poodle (Girl) at TeddyPups U.A.E. Dubai showroom. Microchipped, vaccinated, with international vet passport."
  },
  {
    "slug": "maltipoo-cavapoo-male",
    "name": "Maltipoo & Cavapoo",
    "breed": "Maltipoo & Cavapoo",
    "gender": "Boy",
    "age": "2-3 months",
    "location": "Imported for you",
    "status": "available",
    "images": [
      "/images/b942a5_7ce7e7bd18424b6c8fb16dd30113ade2-mv2.jpg"
    ],
    "hasVideo": false,
    "description": "Healthy, certified teacup Maltipoo & Cavapoo (Boy) at TeddyPups U.A.E. Dubai showroom. Microchipped, vaccinated, with international vet passport."
  },
  {
    "slug": "toy-poodle-male-female",
    "name": "Toy Poodle",
    "breed": "Toy Poodle",
    "gender": "Boy & Girl",
    "age": "2-3 months",
    "location": "Imported for you",
    "status": "available",
    "images": [
      "/images/b942a5_0b2c0c0d178c4005acbe28725a5ea573-mv2.jpg"
    ],
    "hasVideo": false,
    "description": "Healthy, certified teacup Toy Poodle (Boy & Girl) at TeddyPups U.A.E. Dubai showroom. Microchipped, vaccinated, with international vet passport."
  },
  {
    "slug": "maltipoo-female-2",
    "name": "Maltipoo",
    "breed": "Maltipoo",
    "gender": "Girl",
    "age": "2-3 months",
    "location": "Imported for you",
    "status": "available",
    "images": [
      "/images/b942a5_2b5dcece361b4589890ae920c66a1b70-mv2.jpg"
    ],
    "hasVideo": false,
    "description": "Healthy, certified teacup Maltipoo (Girl) at TeddyPups U.A.E. Dubai showroom. Microchipped, vaccinated, with international vet passport."
  },
  {
    "slug": "pomeranian-female",
    "name": "Pomeranian",
    "breed": "Pomeranian",
    "gender": "Girl",
    "age": "2-3 months",
    "location": "Imported for you",
    "status": "available",
    "images": [
      "/images/b942a5_556841b9a73942e5a9d782a683f3bc68-mv2.jpg"
    ],
    "hasVideo": false,
    "description": "Healthy, certified teacup Pomeranian (Girl) at TeddyPups U.A.E. Dubai showroom. Microchipped, vaccinated, with international vet passport."
  },
  {
    "slug": "copper-male",
    "name": "Copper",
    "breed": "Miniature Puppy",
    "gender": "Boy",
    "age": "2-3 months",
    "location": "Imported for you",
    "status": "available",
    "images": [
      "/images/b942a5_bb73ebbb952047988f944f3a8e3052bd-mv2.jpg"
    ],
    "hasVideo": false,
    "description": "Healthy, certified teacup Copper (Boy) at TeddyPups U.A.E. Dubai showroom. Microchipped, vaccinated, with international vet passport."
  },
  {
    "slug": "shitzu-female",
    "name": "Shih Tzu",
    "breed": "Shih Tzu",
    "gender": "Girl",
    "age": "2-3 months",
    "location": "Imported for you",
    "status": "available",
    "images": [
      "/images/b942a5_eb14616c76c24da89afe7fa3b7d7ae6a-mv2.jpeg"
    ],
    "hasVideo": false,
    "description": "Healthy, certified teacup Shih Tzu (Girl) at TeddyPups U.A.E. Dubai showroom. Microchipped, vaccinated, with international vet passport."
  },
  {
    "slug": "shitzu-male",
    "name": "Shih Tzu",
    "breed": "Shih Tzu",
    "gender": "Boy",
    "age": "2-3 months",
    "location": "Imported for you",
    "status": "available",
    "images": [
      "/images/b942a5_344e49c6c34940d2b09a3ddd5c2e3234-mv2.jpg"
    ],
    "hasVideo": false,
    "description": "Healthy, certified teacup Shih Tzu (Boy) at TeddyPups U.A.E. Dubai showroom. Microchipped, vaccinated, with international vet passport."
  },
  {
    "slug": "maltipoo-female-1",
    "name": "Maltipoo",
    "breed": "Maltipoo",
    "gender": "Girl",
    "age": "2-3 months",
    "location": "Imported for you",
    "status": "available",
    "images": [
      "/images/b942a5_7dd33c9b78c04f78a6a1c7386fb55620-mv2.jpg"
    ],
    "hasVideo": false,
    "description": "Healthy, certified teacup Maltipoo (Girl) at TeddyPups U.A.E. Dubai showroom. Microchipped, vaccinated, with international vet passport."
  },
  {
    "slug": "maltipoo-female",
    "name": "Maltipoo",
    "breed": "Maltipoo",
    "gender": "Girl",
    "age": "2-3 months",
    "location": "Imported for you",
    "status": "available",
    "images": [
      "/images/b942a5_6a5617708d75408b8f73725080ed0149-mv2.jpg"
    ],
    "hasVideo": false,
    "description": "Healthy, certified teacup Maltipoo (Girl) at TeddyPups U.A.E. Dubai showroom. Microchipped, vaccinated, with international vet passport."
  },
  {
    "slug": "korean-teacup-pomeranian-1",
    "name": "Korean Teacup Pomeranian",
    "breed": "Korean Teacup Pomeranian",
    "gender": "Boy",
    "age": "2-3 months",
    "location": "Imported for you",
    "status": "available",
    "images": [
      "/images/b942a5_a8d264c1aa754d80bc7c98917dfd1fda-mv2.jpg"
    ],
    "hasVideo": false,
    "description": "Healthy, certified teacup Korean Teacup Pomeranian (Boy) at TeddyPups U.A.E. Dubai showroom. Microchipped, vaccinated, with international vet passport."
  },
  {
    "slug": "korean-teacup-pomeranian",
    "name": "Korean Teacup Pomeranian",
    "breed": "Korean Teacup Pomeranian",
    "gender": "Boy",
    "age": "2-3 months",
    "location": "Imported for you",
    "status": "available",
    "images": [
      "/images/b942a5_967bb346583b4146acb56607f5da5f21-mv2.jpg"
    ],
    "hasVideo": false,
    "description": "Healthy, certified teacup Korean Teacup Pomeranian (Boy) at TeddyPups U.A.E. Dubai showroom. Microchipped, vaccinated, with international vet passport."
  },
  {
    "slug": "korean-teacup-pomeranian-male",
    "name": "Korean Teacup Pomeranian",
    "breed": "Korean Teacup Pomeranian",
    "gender": "Boy",
    "age": "2-3 months",
    "location": "Imported for you",
    "status": "available",
    "images": [
      "/images/b942a5_dcb8eb174915463ea0c40c58b7b0e406-mv2.jpg"
    ],
    "hasVideo": false,
    "description": "Healthy, certified teacup Korean Teacup Pomeranian (Boy) at TeddyPups U.A.E. Dubai showroom. Microchipped, vaccinated, with international vet passport."
  },
  {
    "slug": "pomeranian-ace-boy",
    "name": "Ace",
    "breed": "Miniature Puppy",
    "gender": "Boy",
    "age": "2-3 months",
    "location": "Imported for you",
    "status": "available",
    "images": [
      "/images/27b888_bac41adfadc44dce846a1c3fd0cdb0de-mv2.avif"
    ],
    "hasVideo": false,
    "description": "Healthy, certified teacup Ace (Boy) at TeddyPups U.A.E. Dubai showroom. Microchipped, vaccinated, with international vet passport."
  },
  {
    "slug": "poodle-leo-male",
    "name": "Leo",
    "breed": "Miniature Puppy",
    "gender": "Boy",
    "age": "2-3 months",
    "location": "Imported for you",
    "status": "available",
    "images": [
      "/images/27b888_5f9a7189bb21477d832047aae2040921-mv2.avif"
    ],
    "hasVideo": false,
    "description": "Healthy, certified teacup Leo (Boy) at TeddyPups U.A.E. Dubai showroom. Microchipped, vaccinated, with international vet passport."
  },
  {
    "slug": "maltipoo-mia-girl",
    "name": "Mia",
    "breed": "Miniature Puppy",
    "gender": "Girl",
    "age": "2-3 months",
    "location": "Imported for you",
    "status": "available",
    "images": [
      "/images/27b888_747a4667fec640c69aad9bc045d61ac6-mv2.avif"
    ],
    "hasVideo": false,
    "description": "Healthy, certified teacup Mia (Girl) at TeddyPups U.A.E. Dubai showroom. Microchipped, vaccinated, with international vet passport."
  },
  {
    "slug": "maltipoo-sadie-girl",
    "name": "Sadie",
    "breed": "Miniature Puppy",
    "gender": "Girl",
    "age": "2-3 months",
    "location": "Imported for you",
    "status": "available",
    "images": [
      "/images/27b888_ea6e7e0fcd43447d854657b6de98d4cb-mv2.avif"
    ],
    "hasVideo": false,
    "description": "Healthy, certified teacup Sadie (Girl) at TeddyPups U.A.E. Dubai showroom. Microchipped, vaccinated, with international vet passport."
  },
  {
    "slug": "blue-marle-pomeranian",
    "name": "Pomeranian",
    "breed": "Pomeranian",
    "gender": "Boy",
    "age": "2-3 months",
    "location": "Imported for you",
    "status": "available",
    "images": [
      "/images/27b888_5e612a215bf343328c08d99e0e9c5a37-mv2.avif"
    ],
    "hasVideo": false,
    "description": "Healthy, certified teacup Pomeranian (Boy) at TeddyPups U.A.E. Dubai showroom. Microchipped, vaccinated, with international vet passport."
  },
  {
    "slug": "pomsky-ollie-boy",
    "name": "Ollie",
    "breed": "Miniature Puppy",
    "gender": "Boy",
    "age": "Gone home",
    "location": "Happy in new home",
    "status": "gone_home",
    "images": [
      "/images/27b888_ef3324a358d64858b4873a146574c3b9-mv2.avif"
    ],
    "hasVideo": false,
    "description": "Ollie has happily gone home to their forever family in Dubai and the U.A.E."
  },
  {
    "slug": "maltipoo-bruno-boy",
    "name": "Bruno",
    "breed": "Miniature Puppy",
    "gender": "Boy",
    "age": "Gone home",
    "location": "Happy in new home",
    "status": "gone_home",
    "images": [
      "/images/27b888_301f58cbae624a1da36a79d46571043a-mv2.avif"
    ],
    "hasVideo": false,
    "description": "Bruno has happily gone home to their forever family in Dubai and the U.A.E."
  },
  {
    "slug": "maltese-buddy-male",
    "name": "Buddy",
    "breed": "Miniature Puppy",
    "gender": "Boy",
    "age": "Gone home",
    "location": "Happy in new home",
    "status": "gone_home",
    "images": [
      "/images/27b888_6053b478acb641d1865de22aef938977-mv2.avif"
    ],
    "hasVideo": false,
    "description": "Buddy has happily gone home to their forever family in Dubai and the U.A.E."
  },
  {
    "slug": "maltese-charlie-male",
    "name": "Charlie",
    "breed": "Miniature Puppy",
    "gender": "Boy",
    "age": "Gone home",
    "location": "Happy in new home",
    "status": "gone_home",
    "images": [
      "/images/27b888_b22287e7c1594de7ab2fba46eabea376-mv2.avif"
    ],
    "hasVideo": false,
    "description": "Charlie has happily gone home to their forever family in Dubai and the U.A.E."
  },
  {
    "slug": "pomeranian-daisy-girl",
    "name": "Daisy",
    "breed": "Miniature Puppy",
    "gender": "Girl",
    "age": "Gone home",
    "location": "Happy in new home",
    "status": "gone_home",
    "images": [
      "/images/27b888_c6cbb607448f469a96d73f3bc42a992d-mv2.avif"
    ],
    "hasVideo": false,
    "description": "Daisy has happily gone home to their forever family in Dubai and the U.A.E."
  },
  {
    "slug": "pomeranian-bella-female",
    "name": "Bella",
    "breed": "Miniature Puppy",
    "gender": "Girl",
    "age": "Gone home",
    "location": "Happy in new home",
    "status": "gone_home",
    "images": [
      "/images/27b888_ab014eabe44c4f6ebaacb9ef1869823f-mv2.avif"
    ],
    "hasVideo": false,
    "description": "Bella has happily gone home to their forever family in Dubai and the U.A.E."
  },
  {
    "slug": "poodle-teddy-male",
    "name": "Teddy",
    "breed": "Miniature Puppy",
    "gender": "Boy",
    "age": "Gone home",
    "location": "Happy in new home",
    "status": "gone_home",
    "images": [
      "/images/27b888_430ebbf87dc84b93bcd0b61709a2eaa7-mv2.avif"
    ],
    "hasVideo": false,
    "description": "Teddy has happily gone home to their forever family in Dubai and the U.A.E."
  },
  {
    "slug": "poodle-molly-female",
    "name": "Molly",
    "breed": "Miniature Puppy",
    "gender": "Girl",
    "age": "Gone home",
    "location": "Happy in new home",
    "status": "gone_home",
    "images": [
      "/images/27b888_2b9e32b056624a45b62f7d7b4ec7d105-mv2.avif"
    ],
    "hasVideo": false,
    "description": "Molly has happily gone home to their forever family in Dubai and the U.A.E."
  },
  {
    "slug": "pomski-coco-girl",
    "name": "Coco",
    "breed": "Miniature Puppy",
    "gender": "Girl",
    "age": "Gone home",
    "location": "Happy in new home",
    "status": "gone_home",
    "images": [
      "/images/27b888_ce94335cf4714a99a78c799f666f9323-mv2.avif"
    ],
    "hasVideo": false,
    "description": "Coco has happily gone home to their forever family in Dubai and the U.A.E."
  },
  {
    "slug": "pomsky-rosie-girl",
    "name": "Rosie",
    "breed": "Miniature Puppy",
    "gender": "Girl",
    "age": "Gone home",
    "location": "Happy in new home",
    "status": "gone_home",
    "images": [
      "/images/27b888_08271c7de284451fb9c848757f4838fb-mv2.avif"
    ],
    "hasVideo": false,
    "description": "Rosie has happily gone home to their forever family in Dubai and the U.A.E."
  },
  {
    "slug": "pomeranian-leo-boy",
    "name": "Leo",
    "breed": "Miniature Puppy",
    "gender": "Boy",
    "age": "Gone home",
    "location": "Happy in new home",
    "status": "gone_home",
    "images": [
      "/images/27b888_84815fae2bd34283a7c79985cfc8b568-mv2.avif"
    ],
    "hasVideo": false,
    "description": "Leo has happily gone home to their forever family in Dubai and the U.A.E."
  },
  {
    "slug": "poodle-molly-girl",
    "name": "Molly",
    "breed": "Miniature Puppy",
    "gender": "Girl",
    "age": "Gone home",
    "location": "Happy in new home",
    "status": "gone_home",
    "images": [
      "/images/27b888_5aa959cec570411a8bb9372abe23f5e9-mv2.avif"
    ],
    "hasVideo": false,
    "description": "Molly has happily gone home to their forever family in Dubai and the U.A.E."
  },
  {
    "slug": "poodle-rocky-boy",
    "name": "Rocky",
    "breed": "Miniature Puppy",
    "gender": "Boy",
    "age": "Gone home",
    "location": "Happy in new home",
    "status": "gone_home",
    "images": [
      "/images/27b888_77a51d530b694ba58bc207f2a23e8620-mv2.avif"
    ],
    "hasVideo": false,
    "description": "Rocky has happily gone home to their forever family in Dubai and the U.A.E."
  },
  {
    "slug": "maltipoo-sophie-girl",
    "name": "Sophie",
    "breed": "Miniature Puppy",
    "gender": "Girl",
    "age": "Gone home",
    "location": "Happy in new home",
    "status": "gone_home",
    "images": [
      "/images/27b888_0d89c05fa55c43d4b6d55d573be83e73-mv2.avif"
    ],
    "hasVideo": false,
    "description": "Sophie has happily gone home to their forever family in Dubai and the U.A.E."
  },
  {
    "slug": "maltipoo-lola-girl",
    "name": "Lola",
    "breed": "Miniature Puppy",
    "gender": "Girl",
    "age": "Gone home",
    "location": "Happy in new home",
    "status": "gone_home",
    "images": [
      "/images/27b888_f24865b2456b46feb6ea6694fe90660f-mv2.avif"
    ],
    "hasVideo": false,
    "description": "Lola has happily gone home to their forever family in Dubai and the U.A.E."
  },
  {
    "slug": "pomeranian-rex-boy",
    "name": "Rex",
    "breed": "Miniature Puppy",
    "gender": "Boy",
    "age": "Gone home",
    "location": "Happy in new home",
    "status": "gone_home",
    "images": [
      "/images/27b888_14fd6ec24bd94522bd54a5ae345240b8-mv2.avif"
    ],
    "hasVideo": false,
    "description": "Rex has happily gone home to their forever family in Dubai and the U.A.E."
  },
  {
    "slug": "pomsky-finn-male",
    "name": "Finn",
    "breed": "Miniature Puppy",
    "gender": "Boy",
    "age": "Gone home",
    "location": "Happy in new home",
    "status": "gone_home",
    "images": [
      "/images/27b888_c68794a6e9ee442abb522a1d88a1e8cd-mv2.avif"
    ],
    "hasVideo": false,
    "description": "Finn has happily gone home to their forever family in Dubai and the U.A.E."
  },
  {
    "slug": "maltipoo-zoe-girl",
    "name": "Zoe",
    "breed": "Miniature Puppy",
    "gender": "Girl",
    "age": "Gone home",
    "location": "Happy in new home",
    "status": "gone_home",
    "images": [
      "/images/27b888_89e442e0035442308fc87fe3d2837f1d-mv2.avif"
    ],
    "hasVideo": false,
    "description": "Zoe has happily gone home to their forever family in Dubai and the U.A.E."
  },
  {
    "slug": "pomeranian-mimi-girl",
    "name": "Mimi",
    "breed": "Miniature Puppy",
    "gender": "Girl",
    "age": "Gone home",
    "location": "Happy in new home",
    "status": "gone_home",
    "images": [
      "/images/27b888_870c748ca6ee45cf8e0a311232dfe289-mv2.avif"
    ],
    "hasVideo": false,
    "description": "Mimi has happily gone home to their forever family in Dubai and the U.A.E."
  },
  {
    "slug": "bichon-bailey-boy",
    "name": "Bailey",
    "breed": "Miniature Puppy",
    "gender": "Boy",
    "age": "Gone home",
    "location": "Happy in new home",
    "status": "gone_home",
    "images": [
      "/images/27b888_8d87239e23854214a8718ef8f02c2d50-mv2.avif"
    ],
    "hasVideo": false,
    "description": "Bailey has happily gone home to their forever family in Dubai and the U.A.E."
  },
  {
    "slug": "puppy",
    "name": "Maltipoo",
    "breed": "Miniature Puppy",
    "gender": "Boy",
    "age": "Gone home",
    "location": "Happy in new home",
    "status": "gone_home",
    "images": [
      "/images/27b888_1ae70e063fd7451a87d4dfe79794d58f-mv2.avif"
    ],
    "hasVideo": false,
    "description": "Maltipoo has happily gone home to their forever family in Dubai and the U.A.E."
  },
  {
    "slug": "maltipo",
    "name": "Poodle",
    "breed": "Miniature Puppy",
    "gender": "Boy",
    "age": "Gone home",
    "location": "Happy in new home",
    "status": "gone_home",
    "images": [
      "/images/27b888_aa0ce426ca3848abbc7d695f8c818568-mv2.avif"
    ],
    "hasVideo": false,
    "description": "Poodle has happily gone home to their forever family in Dubai and the U.A.E."
  }
];
