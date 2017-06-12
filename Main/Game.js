class Game {
  constructor(fps) {
    this.money = 50000000000;
    this.energyOutput = 0;
    this.energy = 0;
    this.workers = 0;
    this.demand = 2;
    this.c02TotalEmmision = 5;
    this.c02EmmisionRate = 0;
    this.costs = 0;
    this.fps = fps;
    this.graphicsHandler = new GraphicsHandler();
    this.inputHandler = new InputHandler();
    var obj = this;
    this.buildPanel = new Panel(true);
    this.energyIcon = new Image();
    this.moneyIcon = new Image();
    this.demandIcon = new Image();
    this.c02Icon = new Image();
    this.energyOutputIcon = new Image();
    this.energyIcon.src = "GUI\\Images\\Electricity.png";
    this.moneyIcon.src = "GUI\\Images\\Money.png";
    this.energyOutputIcon.src = "GUI\\Images\\ElectricityOutput.png";
    this.demandIcon.src = "GUI\\Images\\Demand.png";
    this.c02Icon.src = "GUI\\Images\\Co2.png";
    this.statisticsPanel = new Panel(true);
    this.buildCoalPowerPlantBtn = new Button(80,10,95,25,"Build Coal Plant", "#FFFFFF","15px","#FFFFFF", function() {},function () {if (obj.money >= 1750000000) {obj.costs += 9488.88;obj.energyOutput += 500; obj.money -= 1750000000;obj.c02EmmisionRate += 543;}},this.buildPanel,["Coal Power Plant", "Costs 1.75 billion dollars", "Generates 500 megawatts of electricity per hour","Emmits 543 tons of c02 an hour","Costs $9,488.88 an Hour for fuel","The coal plant is the most efficent plant,","but hurts the enviroment."]);
    this.buildWindPowerPlantBtn = new Button(80,25,95,40,"Build Wind Plant", "#FFFFFF","15px","#FFFFFF", function() {},function () {if (obj.money >= 100000) {obj.costs += 25;obj.energyOutput += 6; obj.money -= 100000;}},this.buildPanel,["Wind Power Plant", "Costs 100,000$", "Generates 6 electricity per hour","Emmits no c02!","Costs 50$ an Hour", "This plant is less powerful a coal plant, but,","produces no polution.","and is cheapter to maintain"]);
    this.buildNaturalGasPowerPlantBtn = new Button(64,10,79,25,"Build Natural Gas Plant", "#FFFFFF","15px","#FFFFFF", function() {},function () {if (obj.money >= 100000) {obj.costs += 75;obj.energyOutput += 5; obj.money -= 100000;}},this.buildPanel,["Natural Gas Power Plant", "Costs 100,000$", "Generates 6 electricity per hour","Emmits around 1.5 kilograms of c02 and hour","Costs 50$ an Hour", "The  but,","produces no polution.","and is cheapter to maintain"]);
    this.energyLabel = new Label(9.5,4.5,"0","#FFFFFF","20px Verdana",this.statisticsPanel,function() {obj.energyLabel.text = TextHandler.formatNumber(game.energy);});
    this.moneyLabel = new Label(28,4.5, this.money,"#FFFFFF","20px Verdana",this.statisticsPanel,function() {obj.moneyLabel.text = TextHandler.formatNumber(obj.money);});
    this.demandLabel = new Label(65,4.5,"2","#FFFFFF","20px Verdana",this.statisticsPanel,function() {obj.demandLabel.text = TextHandler.formatNumber(game.demand);});
    this.energyOutputLabel = new Label(47,4.5,"0","#FFFFFF","20px",this.statisticsPanel,function() {obj.energyOutputLabel.text = TextHandler.formatNumber(game.energyOutput);});
    this.c02Label = new Label(88,4.5,"0","#FFFFFF","20px Verdana	",this.statisticsPanel,function() {obj.c02Label.text = TextHandler.formatNumber(obj.c02TotalEmmision);});

    this.buildPanel.addElements([this.buildCoalPowerPlantBtn,this.buildWindPowerPlantBtn,this.buildNaturalGasPowerPlantBtn]);
    this.statisticsPanel.addElements([this.energyLabel,this.moneyLabel,this.energyOutputLabel,this.demandLabel,this.c02Label]);
    setInterval(function () {obj.Update();}, 1000/fps);
  }
  Update() {
    this.money -= this.costs/this.fps  * 120;
    this.graphicsHandler.flushScreen("#000000");
    this.c02TotalEmmision += this.c02EmmisionRate/this.fps  * 120;
    this.energy += this.energyOutput/this.fps  * 120;
    this.graphicsHandler.displayImage(0,0,6,8,this.energyIcon);
    this.graphicsHandler.displayImage(15,0,21,10,this.moneyIcon);
    this.graphicsHandler.displayImage(34,0,42,8,this.energyOutputIcon);
    this.graphicsHandler.displayImage(53,0,60,9,this.demandIcon);
    this.graphicsHandler.displayImage(70,0,82,9,this.c02Icon);
    if (this.energy >= this.demand/this.fps  * 120) {
        this.energy -= this.demand/this.fps  * 120;
        this.money += this.demand/this.fps * 120 * 122.2;
    }
    if (this.demand/1.01 > 2 && this.energyOutput < this.demand  + this.c02EmmisionRate/10) {
      this.demand = this.energyOutput - this.c02EmmisionRate/10 + 1;
    }
    else if (this.energyOutput > 0){
      this.demand = this.demand*(1 + 0.1 - ((this.c02EmmisionRate/3)/(10*this.energyOutput)));
    }
    this.statisticsPanel.Update(this);
    this.buildPanel.Update(this);
  }
}
