angular.module('risk',[])
	.controller('riskController',['$scope','$http',function($scope,$http){
        //initialisation du controlleur
        this.risksss={}
        $http({method: 'GET', url: '/risks/risk'}).
                success(function(data, status, headers, config) {
                        // this callback will be called asynchronously
                        // when the response is available
                        $scope.riskCtrl.risks=data;
                        this.risksss=data;
                }).
                error(function(data, status, headers, config) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                        alert(status);
                        return {};
                });
        $scope.predicate='gravity';
        $scope.reverse=true;
        $scope.show_new_risk=false; //gestion de l'affichage du formulaire new-risk.html
        $scope.history_detail=false; //étend ou réduit l'affichage de l'historique

        //Ajout d'un risque
        this.POST=function($nrisk){
        	//construction de l'objet new_risk
            
            var new_risk={
        		description:$nrisk.desc,
				type:$nrisk.type,
        		risk_opp : $nrisk.risk_opp,
        		date_created: Date.now(),
				origine:$nrisk.orig,
                gravity:$nrisk.gravity,
                probability:$nrisk.probability,
				history:[{
					gravity: $nrisk.gravity||1,
					probability:$nrisk.probability||1,
        		    date:Date.now(),
				}],
				impact:$nrisk.impact,
        		impact_desc: $nrisk.impact_desc,
        		Status_open: true,
        		preventive_action: $nrisk.preventive_action,
        		Leader:$nrisk.leader
    		}       		
              
            $http({method: 'POST', url: '/risks/risk',data:new_risk, headers : "application/x-www-form-urlencoded"}).
            success(function(data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available
                $scope.riskCtrl.risks.push(data);
                //on cache le formulaire
                $scope.show_new_risk=false;
            }).
            error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                alert('Erreur pendant la création du risque dans la BDD. le serveur a renvoyé: ' + status);
            });

            if ($nrisk.keep_open) {
                $scope.show_new_risk=true;
            }
            console.log($scope.show_new_risk);

        };

        //Mise à jour d'un risque
        this.PUT=function($risk,$riskslist){
            console.log("PUT :"+JSON.stringify($risk));
            var updated_risk=$risk;
            $http({method: 'PUT', url: '/risks/risk/'+$risk._id,data:updated_risk, headers : "application/x-www-form-urlencoded"}).
            success(function(data,status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available
                console.log('PUT SUCCESS '+JSON.stringify(data));
                console.log('liste initiale' + JSON.stringify($riskslist))
                var item_to_delete=$riskslist.map(function(e) { return e._id; }).indexOf($scope._id);
                $riskslist.splice(item_to_delete,1);
                $riskslist.push(data);
            }).
            error(function(status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                alert('Erreur pendant la mise à jour du risque dans la BDD. le serveur a renvoyé: ' + status);
            });
        };

        //suppression d'un risque
        this.delete_confirmed=function($idx){
            //fonction appelée si la suppression du risque est confirmée par l'utilisateur
            $http({method: 'DELETE', url: '/risks/risk/'+$idx, headers : "application/x-www-form-urlencoded"}).
                success(function(status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available
                    console.log($idx);
                    var item_to_delete=$scope.riskCtrl.risks.map(function(e) { return e._id; }).indexOf($idx);
                    $scope.riskCtrl.risks.splice(item_to_delete,1);

                }).
                error(function(status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    alert('Erreur pendant la suppression du risque dans la BDD. le serveur a renvoyé: ' + status);
                });
        }; 
 
        this.delete=function($idx){
            //console.log("DELETE "+JSON.stringify($idx));

            // demande de confirmation
            this.delete_confirmed($idx);
        }; 



    }])

    .directive('newRisk',function(){
    	return {
    		restrict: 'E',
    		templateUrl: 'risk/new-risk.html'
    	}
    })

    .directive('listRisks',function(){
        return {
            restrict: 'E',
            templateUrl: 'risk/list-risks.html'
        }
    })
    .directive('editRisk',function(){
        return {
            restrict: 'E',
            templateUrl: 'risk/new-risk.html'
        }  
    })
    .directive('ldSortarrow',function(){
            return {
                restrict: 'E',
                scope:{key:'@key'},
                controller: function($scope)
                    {var key="$scope.key";},
                template: '*{{key}}*<span class="glyphicon glyphicon-chevron-down"></span>'
            }  
        });

    



