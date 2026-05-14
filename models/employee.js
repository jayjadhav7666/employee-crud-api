
const supabase = require('../config/db');

class Employee {

    static async find() {
        const { data, error } = await supabase.from('employees').select('*');
        if (error) {
            throw new Error(error.message);
        } else {
            return data;
        }

    }

    static async findById(id) {
        const { data, error } = await supabase.from('employees').select('*').eq('id', id).single();
        if (error) {
            throw new Error(error.message);
        } else {
            return data;
        }
    }


    static async create(employee) {
        const { data, error } = await supabase.from('employees').insert(employee).select().single();
        if (error) {
            throw new Error(error.message);
        } else {
            return data;
        }
    }
    static async bulkCreate(employees) {

        const { data, error } = await supabase
            .from('employees')
            .insert(employees)
            .select();

        if (error) {
            throw new Error(error.message);
        }
        else {
            return data;
        }
    }
    static async update(id, employee) {
        const { data, error } = await supabase.from('employees').update(employee).eq('id', id).select().single();
        if (error) {
            throw new Error(error.message);
        } else {
            return data;
        }
    }

    static async delete(id) {
        const { data, error } = await supabase.from('employees').delete().eq('id', id).select();
        if (error) {
            throw new Error(error.message);
        } else {
            return data[0];
        }
    }
}

module.exports = Employee; 