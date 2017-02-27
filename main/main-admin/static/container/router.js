import home from './home/router';
import article from './article/router';
function getRouter(arry){
	let routers =[]
	arry.forEach((item)=>{
		routers = routers.concat(item);
	});
	return routers;
}
export default getRouter([home,article]);