## JRS Code 2016 API Exam
### 2016 Transworld Snowboarding Magazine 'Good Wood' snowboards

Contents of this repository simulate calls made to a non-relational database (CouchDB) through a custom API and DAL as one might find when browsing a Transworld Snowboarding (TWS) Magazine's annual selection of top snowboards for 2016. 

#### Instructions:

* after cloning repo run `$ npm install` to download depedencies
* run `$ node snowboardJSON.js` to populate database 
* run `$ node addViews.js` to create views within CouchDB
* run `$ node app.js`
* test away!

### Test Endpoints (run within Postman)
 
#### GET to `http://localhost:4000/snowboards`
 * path to all snowboards
 
#### GET to `http://localhost:4000/snowboards/:id` 
 * path to specific model 
  * snowboard_burton_process_off_axis
  * snowboard_capita_mercury
  * snowboard_capita_ultrafear
  * snowboard_flow_blackout
  * snowboard_gnu_headspace
  * snowboard_gnu_zoid
  * snowboard_jones_ultra_mountain_twin
  * snowboard_lib_tech_bertner_box_scratcher
  * snowboard_libtech_travis_rice_gold_member
  * snowboard_nitro_afterlife
  * snowboard_nitro_team
  * snowboard_ride_berserker
  * snowboard_ride_burnout
  * snowboard_rome_mod_rocker
  * snowboard_rossignol_one_magtek
  * snowboard_salomon_super8
  * snowboard_salomon_villain
  * snowboard_stepchild_mai_tai
  * snowboard_stepchild_sleazy_rider

#### GET to `http://localhost:4000/snowboard_type`
 * Search by "Type"
 * ex. `http://localhost:4000/snowboard_type?Type=park`
  * park
  * all_mountain

#### GET to `http://localhost:4000/snowboard_make`
 * Search by "Make"
 * ex. `http://localhost:4000/snowboard_make?Make=ride`
  * burton
  * capita
  * flow
  * gnu
  * jones
  * libtech
  * nitro
  * ride
  * rome
  * rossignol
  * salomon
  * stepchild
 
#### GET to http://localhost:4000/snowboard_length
 * Search by "Length"
 * ex. http://localhost:4000/snowboard_length?Length=157
   * 153
   * 154
   * 155 
   * 156
   * 157
   * 158
   * 159
   
#### POST to http://localhost:4000/snowboards
 * create database entry

#### PUT to http://localhost:4000/snowboards/:id 
 * update existing entry
   
