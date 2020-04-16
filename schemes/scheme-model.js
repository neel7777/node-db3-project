const db = require('../data/db-config');

module.exports = {
	find,
	findById,
	findSteps,
	add,
	update,
    remove,


};

function find() {
return db('schemes');

}

function findById(id) {

	return db('schemes')
		.where({ id })
		.first();
}


function findSteps(id) {

    
	return db('steps as st')
		.join('schemes as sc', 'sc.id', 'st.scheme_id')
		.select('sc.scheme_name', 'st.step_number', 'st.instructions')
		.where('sc.id', id)
		.orderBy('st.step_number');
}


function add(scheme) {
	return db('schemes')
		.insert(scheme)
		.then(([id]) => {
			return findById(id);
		});

}

function update(changes, id) {
    return db('schemes')
    	.where({ id })
        .update(changes)
        .then(() => {
            return findById(id);

        });
}

function remove(id) {
	return db('schemes')
		.where({ id })
        .del()

}