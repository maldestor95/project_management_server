module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);
	grunt.initConfig({
		mobile_path:'F:\download',
        pkg: grunt.file.readJSON('package.json'),
        
        // configuration des tâches grunt
//***************************************************************************
        less: {
        	  development: {
        	    files: {
					'dist/css/MC11.css':'./src/css/less/Main.less',
        	    }
        	  }
        },
//***************************************************************************		
		clean:{
			css_development:['src/css/less/temp_css/'],	
			dist:'dist',
		},
//********************remplacement de bloc de commentaire par un autre fichier html *******************************
		processhtml:{
			options:{
				data:{
					message:'Hello world'
				}
			},
			dist :{
				files:{
					'dist/index.htm':['src/pages/index.htm']
				}
			}
		},
//*************** HTML validation *******************
		lint5:{
			dirPath: "src/pages",
			templates:['index.htm'],	
		},
		
//***************************************************************************
		watch: { 
			  CSS_DEV: {
			    cwd:'src',
			    files: ['src/**/*.less'],
			    tasks: ['less:development'],
			    options: {
			      spawn: false,
			    },
			  },
			  HTML_DEV: {
				  	cwd:'src',
				  	files: ['src/pages/*.htm'],
				    tasks: ['processhtml:dist'],
				    options: {
				      spawn: false,
				    },
				  },
			  JS_DEV: {
				  	cwd:'src',
				    files: ['src/js/*.js'],
				    tasks: ['copy:js'],
				    options: {
				      spawn: false,
				    },
				  },
		},
//***************************************************************************
		copy:{
			dev :{
				files:[
				       {expand: true,src: ['src/js/**/*.js'],dest: 'dist/js/', filter: 'isFile',flatten:true},
				       {expand: true,cwd:'./src/bootstrap/',src: ['**/*'],dest: 'dist/bootstrap/', filter: 'isFile'},				       
				      ]
				},
			js :{
				files:[
				       {expand: true,src: ['src/js/**/*.js'],dest: 'dist/js/', filter: 'isFile',flatten:true},				       
				      ]
				},
			mobile:{
				files:[
				       {expand: true,src: ['dist/**/*.*'],dest: '<%= mobile_path %>'},	       
				      ]
				}
			},
//***************************************************************************
		qunit:{
			all:{
				files:[
				'src/test/test.htm'
				]
			}
		},
//***************************************************************************
		connect: {
		    server: {
		      options: {
		        port: 9001,
		        base: 'dist'
		      }
		    }
		  }
	});
//***************************************************************************    
    // Les tâches sont enregistrées ici
    grunt.registerTask('auto_css', ['watch:CSS_DEV']);
    grunt.registerTask('DEV',['clean:dist','less','processhtml','copy:dev']);
    grunt.registerTask('default',['DEV']);
    grunt.registerTask('mobile',['copy:mobile']);
    
};

