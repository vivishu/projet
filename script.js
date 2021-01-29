function date_heure()
{
        date = new Date;
        annee = date.getFullYear();
        moi = date.getMonth();
        mois = new Array('Janvier', 'F&eacute;vrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Ao&ucirc;t', 'Septembre', 'Octobre', 'Novembre', 'D&eacute;cembre');
        j = date.getDate();
        jour = date.getDay();
        jours = new Array('Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi');
        h = date.getHours();
        if(h<10)
        {resultat
                h = "0"+h;
        }
        m = date.getMinutes();
        if(m<10)
        {
                m = "0"+m;
        }
        s = date.getSeconds();
        if(s<10)
        {
                s = "0"+s;
        }
        resultat =jours[jour]+' '+j+' '+mois[moi]+' '+annee 
        heure= h+':'+m+':'+s
        document.getElementById('date').innerHTML = resultat;
        document.getElementById('heure').innerHTML = heure;
        setTimeout('date_heure("date");','1000');
        setTimeout('date_heure("heure");','1000');

        res.render('index.js',{date_heure: date_heure});


        return ;
}
