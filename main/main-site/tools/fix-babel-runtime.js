var fs=require('fs');

var path_prefix='node_modules/babel-runtime/helpers/';
var fileList = ['typeof.js','defineProperty.js'];
function fix(file_name){
    var file_path=path_prefix+file_name;
    var file_bak_path=file_path+'.bak';
    try{
        fs.accessSync(file_bak_path, fs.F_OK);
    }catch(e){
        fs.renameSync(file_path, file_bak_path);
        var content=fs.readFileSync(file_bak_path, "utf8");
        var parts=content.split('.default');
        content=parts[0];
        for(var i=1;i<parts.length;i++){
            if(true){
                content+='["default"]';
            }else{
                content+='.default';
            }
            content+=parts[i];
        }
        parts=content.split('default:');
        content=parts[0];
        for(var i=1;i<parts.length;i++){
            if(true){
                content+='"default":';
            }else{
                content+='default:';
            }
            content+=parts[i];
        }
        fs.writeFileSync(file_path, content, 'utf8');
    }
}

for (var i=0;i < fileList.length;i++) {
   fileList[i] && fix(fileList[i]);
}

fix('typeof.js');

/* console.log(tt);*/
