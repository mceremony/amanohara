// JavaScript Document
jQuery(document).ready(function($){
  var calc_btn = $(".simulator-calc");
  var change_target = $("#simulator-age,#simulator-sex-man,#simulator-sex-woman");
  var is_auto_calc = false;
  var tar_age = $("#simulator-age");
  var tar_sex_man = $("#simulator-sex-man");
  var tar_sex_woman = $("#simulator-sex-woman");
  var plans = $(".simulator-plan");
  var price_ary = [];
  var is_changing = false;
  var change_speed = 20;//数字が変わるスピード(ミリ秒)
  
  var change_interval;

  var data_woman = '1,20,2010/1,21,2080/1,22,2140/1,23,2210/1,24,2290/1,25,2350/1,26,2430/1,27,2510/1,28,2590/1,29,2680/1,30,2770/1,31,2850/1,32,2940/1,33,3020/1,34,3110/1,35,3200/1,36,3290/1,37,3380/1,38,3470/1,39,3560/1,40,3630/1,41,3710/1,42,3790/1,43,3860/1,44,3920/1,45,3980/1,46,4030/1,47,4070/1,48,4110/1,49,4140/1,50,4180/1,51,4220/1,52,4260/1,53,4300/1,54,4350/1,55,4410/1,56,4480/1,57,4550/1,58,4640/1,59,4720/1,60,4810/1,61,4890/1,62,4970/1,63,5050/1,64,5140/1,65,5220/1,66,5290/1,67,5360/1,68,5420/1,69,5480/2,20,-/2,21,-/2,22,-/2,23,-/2,24,-/2,25,-/2,26,-/2,27,-/2,28,-/2,29,-/2,30,-/2,31,-/2,32,-/2,33,-/2,34,-/2,35,-/2,36,-/2,37,-/2,38,-/2,39,-/2,40,2630/2,41,2690/2,42,2740/2,43,2790/2,44,2840/2,45,2880/2,46,2910/2,47,2930/2,48,2960/2,49,2970/2,50,2980/2,51,3010/2,52,3030/2,53,3050/2,54,3080/2,55,3110/2,56,3150/2,57,3200/2,58,3250/2,59,3300/2,60,3350/2,61,3400/2,62,3460/2,63,3510/2,64,3560/2,65,3610/2,66,3650/2,67,3690/2,68,3730/2,69,3760/3,20,-/3,21,-/3,22,-/3,23,-/3,24,-/3,25,-/3,26,-/3,27,-/3,28,-/3,29,-/3,30,-/3,31,-/3,32,-/3,33,-/3,34,-/3,35,-/3,36,-/3,37,-/3,38,-/3,39,-/3,40,-/3,41,-/3,42,-/3,43,-/3,44,-/3,45,-/3,46,-/3,47,-/3,48,-/3,49,-/3,50,-/3,51,-/3,52,-/3,53,-/3,54,-/3,55,-/3,56,-/3,57,-/3,58,-/3,59,-/3,60,2405/3,61,2445/3,62,2485/3,63,2525/3,64,2570/3,65,2610/3,66,2645/3,67,2680/3,68,2710/3,69,2740';
  var data_man = '1,20,1620/1,21,1660/1,22,1710/1,23,1770/1,24,1830/1,25,1890/1,26,1950/1,27,2020/1,28,2090/1,29,2170/1,30,2250/1,31,2320/1,32,2400/1,33,2490/1,34,2590/1,35,2690/1,36,2790/1,37,2900/1,38,3000/1,39,3130/1,40,3250/1,41,3390/1,42,3530/1,43,3670/1,44,3830/1,45,4000/1,46,4180/1,47,4360/1,48,4550/1,49,4760/1,50,4970/1,51,5200/1,52,5440/1,53,5680/1,54,5940/1,55,6210/1,56,6470/1,57,6760/1,58,7050/1,59,7350/1,60,7660/1,61,7990/1,62,8320/1,63,8670/1,64,9020/1,65,9390/1,66,9750/1,67,10120/1,68,10500/1,69,10880/2,20,-/2,21,-/2,22,-/2,23,-/2,24,-/2,25,-/2,26,-/2,27,-/2,28,-/2,29,-/2,30,-/2,31,-/2,32,-/2,33,-/2,34,-/2,35,-/2,36,-/2,37,-/2,38,-/2,39,-/2,40,2190/2,41,2280/2,42,2370/2,43,2470/2,44,2580/2,45,2690/2,46,2810/2,47,2930/2,48,3060/2,49,3200/2,50,3340/2,51,3490/2,52,3650/2,53,3810/2,54,3990/2,55,4170/2,56,4350/2,57,4540/2,58,4740/2,59,4940/2,60,5150/2,61,5380/2,62,5600/2,63,5840/2,64,6090/2,65,6330/2,66,6590/2,67,6850/2,68,7110/2,69,7380/3,20,-/3,21,-/3,22,-/3,23,-/3,24,-/3,25,-/3,26,-/3,27,-/3,28,-/3,29,-/3,30,-/3,31,-/3,32,-/3,33,-/3,34,-/3,35,-/3,36,-/3,37,-/3,38,-/3,39,-/3,40,-/3,41,-/3,42,-/3,43,-/3,44,-/3,45,-/3,46,-/3,47,-/3,48,-/3,49,-/3,50,-/3,51,-/3,52,-/3,53,-/3,54,-/3,55,-/3,56,-/3,57,-/3,58,-/3,59,-/3,60,3830/3,61,3995/3,62,4160/3,63,4335/3,64,4510/3,65,4695/3,66,4875/3,67,5060/3,68,5250/3,69,5440';
  var tar_data_ary = {};
  set_csv_to_ary(data_man,"man");
  set_csv_to_ary(data_woman,"woman");
  
  for(var agenum=20; agenum<70; agenum++){
    $("#simulator-age").append('<option value='+agenum+'>'+agenum+'</option>');
  }
  
  function set_csv_to_ary(tar_csv,sex){
    var data_ary = tar_csv.split("/");
    $.each(data_ary,function(i, val){
      data_ary[i] = val.split(",");
      tar_data_ary[sex+"-"+data_ary[i][0]+"-"+data_ary[i][1]] = data_ary[i][2];
    });
  }
  
  calc_btn.click(function(){
    is_auto_calc = true;
    calc_price();
    return false;
  });
  change_target.change(calc_price);
  
  function calc_price(){
    //console.log("calc");
    if(is_auto_calc){
      var age = tar_age.val();
      var sex = "";
      if(tar_sex_man.prop('checked')) sex = "man";
      if(tar_sex_woman.prop('checked')) sex = "woman";
      if(age && sex){
        plans.each(function(i){
          var p = $(this);
          var plannum = i+1;
          var price = tar_data_ary[sex+"-"+plannum+"-"+age];
          if(!price || price==="-" || price==="ー"){
            p.addClass("noprice");
            price_ary[i] = '00000'.split("");
        }else{
            p.removeClass("noprice");
            price_ary[i] = ( '00000' + price ).slice( -5 ).split('');//5桁0埋めして1文字ずつ配列化
          }
        });
        if(!is_changing){
          change_interval = setInterval(change_price,change_speed);
          is_changing = true;
        }
      }else{
        plans.addClass("noprice");
      }
    }
  }
  function change_price(){
    //console.log("changing");
    var is_fin = true;
    plans.each(function(i){
      $(this).find(".simulator-price-num").each(function(pi){
//         console.log("plan"+i+" n"+pi+"="+price_ary[i][pi] );
         var now_num = parseInt($(this).text());
         if( now_num != parseInt( price_ary[i][pi] ) ){
          var next_num = ( now_num < parseInt( price_ary[i][pi] ) ) ? now_num + 1 : now_num - 1;
          if(next_num>9){ next_num = 0; }
          $(this).text(next_num);
          if( next_num != price_ary[i][pi] ){
            is_fin = false;
          }else{
            if(pi==0 && next_num == 0){
              $(this).addClass("zero");
            }else if(pi==0){
               $(this).removeClass("zero");
            }
          }
          //console.log("after: plan"+i+" n"+pi+"="+price_ary[i][pi]+"｜"+next_num );
        }
        
      });
    });
    if(is_fin){
      clearInterval(change_interval);
      is_changing = false;
    }
  }

  
});