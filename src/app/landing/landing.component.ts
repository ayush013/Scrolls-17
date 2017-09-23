import { Component } from '@angular/core';
import { Rule } from '../rule.model';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {

  constructor() { }

  branch = 'SCROLLS 2017 TOPICS';
  dummy = 'S';
  topic = '';
  quote = 'An idea is salvation by imagination!';
  topictitle = ['COMPUTER SCIENCE AND ENGINEERING', 'ELECTRONICS AND COMMUNICATION', 
  'ELECTRICAL AND ELECTRONICS', 'MECHANICAL ENGINEERING', 'CIVIL ENGINEERING', 'MANAGEMENT SCIENCES'];
  topicdummy = ['C', 'E', 'E', 'M', 'C', 'M'];
  topicquote = ['“Meet us at the intersection of technology and innovation.”', 'Illuminating ideas beyond convention.'
  , 'IC the world embedded in us.', 'Let machines serve the mankind.', 'Building future on foundation of excellence.', 
  'Leading the next big change.'];

  topiclist = ['• Embedded Systems', '• Augmented Reality','• Natural Language Processing',
	'• Genetic Algorithms and Bio-inspired Computing','• Cloud Computing','• Semantic Web',
	'• Mobile Computing and Data Intensive Computing','• Soft Computing including multi-criteria Analysis',
	'• Cybernetics','• Nano Computing','• Quantum Computing','• Big Data Analytics',

    '• 5G Technology', '• Mobile Satellite Communication', '• Optoelectronics', '• Nanotechnology', '• VLSI',
	'• Neural Networks', '• Electronic Counter measures in Defense Systems & IFF Technologies',
	'• Substrate Integrated Waveguides', '• Speech Processing', '• Antenna Design and Radar Technologies', 

	'• Intelligence Substation', '• Smart Electrical Energy Metering', '• Zero Energy Motors', 'MRI Technology',
	'• Wireless Power Transmission ', '• Magnetic Motors', '• Electromagnetic Anti-gravity Propulsion',
	'• Power Quality Issues with Grid Connected  Wind Energy Systems', '• Renewable Energy & Environment Protection', 
	'• Smart Grid Technology', '• Super Conducting Rotating Machines', 

	'• Power Generation using Nano-carbon tubes', '• Cryogenic Engines', '• Application of CAD software (Catia, ProE) and designing software',
	'• Automatic Transmission in Automobiles', '• Hydraulic and pneumatic actuators',
	'• Improvisation during the last two decades in passenger cars', '• Nanotechnology',
	'• Recent developments in materials for bio-implants.', '• Kinematics/dynamics of Robotic  Manipulators', 
	'• Robotic Applications: Present & Future', '• Additive Manufacturing', '• TQM concepts for zero rejection', 

	'• Indian Railways: Safety considerations, bullet trains', '• Infrastructure: Housing for all, smart housing', 
	'• Earthquake Engineering – Revised code IS: 1893, seismic risk assessment for  NCR region',
	'• Smart cities', '• Solid Waste Management', '• Metro Rails DMRC and Metro for Bombay', 'Flood Management: Storage Dams', 
	'• Save Drinking Water', '• Creating Water Conservation', '• Cleaning and rejuvenating Ganges', 
	'• Global Warming: Equity and global Climate Agreement, A step towards a clean Earth', 
	'• Application of Remote Sensing and GIS  techniques', 

	'• BREXIT: Impact on Indian Economy.', '• Role of Skill Development in winning the war against unemployment.', 
	'• Social Networking is the prime catalyst in shaping  the actions of Indian Youths.', '• India is the new China: A Distant Dream.', 
	'• The Glass Ceiling: Reality or Myth?', '• Poverty in Third World Countries is due to Prosperity in First World Countries.', 
	'• Steal a Few Lakh and you’re a Criminal; Steal a Few  Hundred Crore and you become an Industrialist.', 
	'• 100% FDI in Indian Defense Sector: Boon or Bane.', '• Rural Development is the right answer to our unemployment problem.',
	'• Ethics in business: An integral part or a passing fad?'
  ];

  rules: Rule[] = [
  new Rule('01.','The competition will be open to all bonafide students of Engineering and Management Colleges'),
  new Rule('02.','A maximum of 3 and a minimum of 2 authors per paper are allowed.'),
  new Rule('03.','A synopsis of maximum 1000 words is to be sent by the specified date. Based on the synopsis, an expert committee will select the papers for inclusion in the final paper presentation.'),
  new Rule('04.','For presentation, a time slot of 7 minutes + 3 minutes (for Q&A) will be given to each team.'),
  new Rule('05.','A soft copy of the final paper is to be sent via e-mail before the designated date.'),
  new Rule('06.','The paper should be typed in single space, double column format, using Times New Roman font and size 12. The max. number of pages should be 10 and the page should have no numbers. A margin of 1’’ should be left all around .A sample synopsis for reference is available.'),
  new Rule('07.','The first page should include Title,Name(s) of authors,their college name,telephone numbers as well as their e-mail addresses. This information is to be included with extended abstract .')
  ];
 
  x = 1;

  list = ["A better world is constructed by unification of significant domains. We constructed, we automated, we embeddded a brighter future by our own minds. Sprawling and enticing every realm of human life, these domains have enhanced simplicity. In an effort towards endless revolution, lets walk a little further and create new benchmarks. Along side mentioned the topics under various domains for Scrolls 2017."];

  topicChange(x) {
  this.branch = this.topictitle[x];
  this.dummy = this.topicdummy[x];
  this.quote = this.topicquote[x];
}

   topicList(start, end) {
   	this.list = [];
   	for (var i = start; i <= end; i++) {
   		 this.list[i] = this.topiclist[i];
   	}
   }  

}
