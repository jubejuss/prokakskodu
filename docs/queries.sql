Select concat(users.firstName, " ", users.lastName) as "Elanik"
	FROM indicators INNER JOIN users INNER JOIN gas INNER JOIN water
    on indicators.users_id = users.id and indicators.gas_id = gas.id and indicators.water_id = water.id
	WHERE oppeaine.ainenimi = 'lihtne matemaatika';


    Select concat(tudeng.eesnimi, " ", tudeng.perekonnanimi) as "Osalev tudeng"
	FROM voetud_oppeaine INNER JOIN tudeng INNER JOIN oppeaine INNER JOIN semester
    on voetud_oppeaine.tudeng_id = tudeng.id and voetud_oppeaine.oppeaine_id = oppeaine.id and voetud_oppeaine.semester_id = semester.id
	WHERE oppeaine.ainenimi = 'lihtne matemaatika';