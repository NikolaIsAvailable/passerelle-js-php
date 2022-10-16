SELECT *, Genre.Nom, Editeur.Nom 
FROM JeuVideo 
INNER JOIN Genre 
ON JeuVideo.IdGenre = Genre.Id 
INNER JOIN Editeur 
ON JeuVideo.IdEditeur = Editeur.id 
ORDER BY JeuVideo.Nom ASC