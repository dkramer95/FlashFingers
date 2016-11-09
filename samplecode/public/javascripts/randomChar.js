var randToons = [];

function Hero(name, description) {
	this.name = name;
	this.description = description;
}
randToons.push(new Hero('ANIMAL AVATAR', 'The  Animal  Avatar  is  a character that shares the traits of a particular animal but on a super scale. As a result, animal avatars tend to be tough, quick and usually have extraordinary movement and and  deliver  good  amounts  of  physical punishment, but tends to fair worse against mental attacks.'));

randToons.push(new Hero('BATTLESUIT', 'The Battlesuit is a character that gains most, if not all, of his or her superhuman abilities from a suit of incredible armor. Battlesuits who craft their own suits tend to be brilliant. Otherwise, they are simply normal (albeit heroic) people wielding incredibly durable pieces of hardware that possess a wide range of abilities, such as Flight and Super Strength.'));

randToons.push(new Hero('BLASTER', 'The Blaster is an unsubtle character that specializes in using a weapon or energy type to blast opponents out of the fight. Blasters need to take out opponents quickly or risk being overwhelmed by faster or stronger foes. When protected by teammates, blasters can concentrate multiple devastating attacks on single opponents or blow away large groups of weaker opponents.'));

randToons.push(new Hero('BRICK', 'The Brick is incredibly strong and tough, able to pound opponents into submission while shrugging off all but the mightiest blows. Their main weakness is their vulnerability to mental attacks.'));

randToons.push(new Hero('CONSTRUCT', 'The Construct, like many other super-powered archetypes, tends to be incredibly durable due to being crafted from something other than flesh and blood. Constructs have a number of advantages due to their unliving natures. Healing, however, is more difficult for constructs, and they are often vulnerable to certain attacks.'));

randToons.push(new Hero('CRIME FIGHTER', 'The Crime Fighter is the skilled member of the team, trading jaw dropping Powers for a broad range of Aptitudes. While tougher than most normal humans, crime fighters tend to make poor frontline fighters when facing super-powered opponents. They can, however, still make an impact in a fight by fighting strategically.'));

randToons.push(new Hero('ELEMENTAL CONTROLLER', 'The Elemental Controller bends one or more of the basic elements of the universe to his or her will. Elemental controllers can use their element type as a weapon, a tool or a defensive Power. Some can even take the form of the element they control.  Elemental  controllers  tend  to personify the element physically and mentally. They  might  be  short  tempered  (fire), incredibly tough (earth), adaptable (water) or any other trait commonly associated with their element.'));

randToons.push(new Hero('ENERGY CONTROLLER', 'The Energy Controller wields a type of energy found either in real life or in comic book lore. In some cases, energy controllers can even change the way energy types behave. Examples include crafting solid objects out of light or using shadows as portals to other shadows. Energy controllers tend to have a wide range of abilities at their disposal, all linked to their particular energy.'));

randToons.push(new Hero('GADGETEER', 'The Gadgeteer relies on being able to craft just the right device for any particular situation. Physically and mentally, gadgeteers tend to be in the normal human range and thus have a hard time going toe-to-toe with more powerful foes. Given time and some helpful teammates, however, they can produce and use well-crafted gadgets to exploit any weakness shown by their enemies.'));

randToons.push(new Hero('MARTIAL ARTIST', 'Due to intense physical and mental training, the Martial Artist is the most dangerous hand-to-hand combatant in the campaign and also among the most resilient. The greatest challenge faced by most martial artists is their need to get into close quarters to fight their opponents. Some martial artists compensate by honing their physical skills to the degree that they can move or leap with preternatural ability.'));

randToons.push(new Hero('MENTALIST', 'The Mentalist can delve into and control opponents’ minds as well as resist all but the most powerful psychic attacks. While mentalists are the undisputed masters of psychic combat, they are vulnerable to conventional attacks and should probably leave the blast-and-bash fights to others.'));

randToons.push(new Hero('MIMIC', 'Like many other physical powerhouses, the Mimic can take a pounding and dish out damage in a bare-knuckle brawl. A mimic’s unique abilities comes from being able to mimic the properties of substances they touch, gaining the ability to become as unyielding as steel, as pliable as leather or anything else in-between. Mimics should pay close attention to what substances are in the vicinity of a fight and be prepared to pick the best option to counter the abilities of the opponent at hand.'));

randToons.push(new Hero('PARAGON', 'The Paragon is the cornerstone of the team. Paragons balance of raw strength and toughness with super movement Powers and enough charisma to earn the trust of even the most jaded characters in the campaign world.'));

randToons.push(new Hero('SHAPE SHIFTER', 'The Shape Shifter is a flexible character that can assume different forms. Shape shifters are most useful when their assumed shape matches up well against the strengths and weaknesses of their opponents. Shape shifters are able fighters but tend to have average mental attributes, making them vulnerable to psychic attacks.'));

randToons.push(new Hero('SORCERER', 'The Sorcerer has Wizardry, the flexable Power available to the super-powered character, but pays a heavy price for it. While sorcerers are able to hold up well against mental attacks, they usually only possess average physical characteristics and  are thus poorly equipped to handle one-on-one brawls with stronger, faster or tougher opponents. Nevertheless, sorcerers are never without the most useful Power for any given situation and always have the option of teleporting away if a fight gets out of hand.'));

randToons.push(new Hero('SPEEDSTER', 'The Speedster is all about doing things quickly; they can rush in, hit their opponents multiple times and then speed away. While speedsters are generally limited to hand-to-hand combat, this is usually less of a problem for them than it is for others, as speedsters can cover incredible distances in just a few seconds. Speedsters are well-balanced characters and can fare well against most opponents.'));

randToons.push(new Hero('WARRIOR', 'The Warrior is a brawler who loves nothing more than clashing with all opponents foolish enough to stand their ground. The Warrior is one of the toughest archetypes and arguably the most difficult to physically defeat. Warriors are vulnerable to ranged attacks and to clever opponents who exploit their Disadvantages but are otherwise deadly adversaries.'));

randToons.push(new Hero('WEAPON MASTER', 'The Weapon Master is a normal human relies heavily on the abilities of a unique weapon (or set of weapons) to face off against super-powered opponenents. Weapon masters almost always wield weapons that have one or more tricks. This often allows them to gain the element of surprise against their opponents.'));

function pushToPage(hero) {
	var insertHero = document.getElementById("placeHero");
	insertHero.innerHTML = "<div class='hero-container'><h2>" + hero.name + "</h2><span class='hero-description' style='font-size:20px'>" + hero.description + "</span></div>";
}

function randHero() {
	var magicNum = randToons.length - 1;
	var randNum = Math.floor(Math.random() * (magicNum - 0 + 1)) + 0;

	var randHero = randToons[randNum];
	pushToPage(randHero);
	console.log(randHero);
}
randHero();